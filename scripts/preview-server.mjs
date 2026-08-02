import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";

loadDotEnv();

const host = process.env.HOST || "127.0.0.1";
const port = Number.parseInt(process.env.PORT || "4321", 10);
const rootDir = resolve(process.cwd());

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"]
]);

const functionHandlers = new Map([
  ["/.netlify/functions/google-places-school-data", () => import("../netlify/functions/google-places-school-data.mjs")]
]);

function loadDotEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    if (!key || key in process.env) {
      continue;
    }

    let value = trimmed.slice(separatorIndex + 1).trim();
    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function resolveRequestPath(urlPath) {
  const pathname = decodeURIComponent((urlPath || "/").split("?")[0]);
  const candidate = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const normalized = normalize(candidate);
  const absolute = resolve(rootDir, normalized);

  if (!absolute.startsWith(rootDir)) {
    return null;
  }

  if (existsSync(absolute)) {
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      const indexPath = join(absolute, "index.html");
      if (existsSync(indexPath)) {
        return indexPath;
      }
    }
    if (stats.isFile()) {
      return absolute;
    }
  }

  const directoryIndex = resolve(rootDir, normalized, "index.html");
  if (directoryIndex.startsWith(rootDir) && existsSync(directoryIndex)) {
    return directoryIndex;
  }

  return null;
}

async function handleFunctionRequest(request, response) {
  const pathname = decodeURIComponent((request.url || "/").split("?")[0]);
  const loader = functionHandlers.get(pathname);
  if (!loader) {
    return false;
  }

  const mod = await loader();
  const body = await readRequestBody(request);
  const result = await mod.handler({
    httpMethod: request.method || "GET",
    body,
    headers: request.headers
  });

  response.writeHead(result?.statusCode || 200, result?.headers || {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(result?.body || "");
  return true;
}

function readRequestBody(request) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolveBody(chunks.length ? Buffer.concat(chunks).toString("utf8") : ""));
    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  if (await handleFunctionRequest(request, response)) {
    return;
  }

  const filePath = resolveRequestPath(request.url);

  if (!filePath) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, {
    "Content-Type": mimeTypes.get(extension) || "application/octet-stream",
    "Cache-Control": "no-store"
  });

  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Surfbooker preview running at http://${host}:${port}`);
});
