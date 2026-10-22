// Region and sub-region hubs used for breadcrumbs, hub pages and cross-links.
export const regions = {
  "north-devon": { name: "North Devon", hubPath: "/guides/north-devon/", parent: "devon" },
  "south-devon": { name: "South Devon", hubPath: "/guides/south-devon/", parent: "devon" },
  devon: { name: "Devon", hubPath: "/guides/devon/" },
  cornwall: { name: "Cornwall", hubPath: "/guides/cornwall/" },
  wales: {
    name: "Wales", hubPath: "/guides/wales/",
    subRegions: {
      pembrokeshire: { name: "Pembrokeshire", hubPath: "/guides/wales/pembrokeshire/" },
      gower: { name: "Gower", hubPath: "/guides/wales/gower/" },
      "south-wales-coast": { name: "South Wales coast", hubPath: "/guides/wales/south-wales-coast/" },
      "north-wales": { name: "North Wales", hubPath: "/guides/wales/north-wales/" }
    }
  },
  "southern-england": { name: "Southern England", hubPath: "/guides/southern-england/" },
  "northeast-england-yorkshire": { name: "Northeast England & Yorkshire", hubPath: "/guides/northeast-england-yorkshire/" },
  scotland: { name: "Scotland", hubPath: "/guides/scotland/" },
  "northern-ireland": { name: "Northern Ireland", hubPath: "/guides/northern-ireland/" },
  somerset: { name: "Somerset", hubPath: "/guides/" }
};
