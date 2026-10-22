(function () {
  'use strict';
  var storageKey = 'surfbooker-saved-trip-v1';
  var getSaved = function () { try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch (_) { return []; } };
  var setSaved = function (items) { try { localStorage.setItem(storageKey, JSON.stringify(items)); } catch (_) {} renderSaved(); };

  function setupFinder() {
    var grid = document.querySelector('.finder-grid');
    var destinations = window.surfbookerDestinations || [];
    var tileImages = [
      '/images/Surfers%20on%20beach.avif', '/images/generic%20wave.jpg',
      '/images/lineup.avif', '/images/Surfer%20on%20wave%202.avif',
      '/images/sunset%20surfers%20on%20beach.jpg', '/images/generic%20surfer.jpeg',
      '/images/Surfers%20in%20waves.jpg', '/images/Sunset%20surfer%20sat%20in%20water.jpg'
    ];
    if (grid && destinations.length) {
      var existingUrls = Array.from(grid.querySelectorAll('.finder-card a')).map(function (link) {
        return new URL(link.getAttribute('href'), location.origin).pathname.toLowerCase();
      });
      var regionLabels = { devon: 'Devon', cornwall: 'Cornwall', wales: 'Wales', scotland: 'Scotland', northeast: 'Northeast England & Yorkshire', 'northern-ireland': 'Northern Ireland', 'southern-england': 'Southern England & Isle of Wight', dorset: 'Dorset' };
      var escapeHtml = function (value) {
        return String(value).replace(/[&<>"']/g, function (character) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
        });
      };
      destinations.filter(function (destination) {
        if (!destination.url) return false;
        var pathname = new URL(destination.url, location.origin).pathname.toLowerCase();
        if (existingUrls.includes(pathname)) return false;
        existingUrls.push(pathname);
        return true;
      }).forEach(function (destination) {
        var card = document.createElement('article');
        card.className = 'finder-card';
        card.dataset.destinationTags = '';
        card.innerHTML = '<p class="finder-location">' + escapeHtml(regionLabels[destination.region] || destination.region) + '</p>' +
          '<h3>' + escapeHtml(destination.title) + '</h3>' +
          '<p>' + escapeHtml(destination.description) + '</p>' +
          '<a href="' + escapeHtml(destination.url) + '">Explore ' + escapeHtml(destination.title) + ' &#8594;</a>';
        grid.appendChild(card);
      });
      Array.from(grid.querySelectorAll('.finder-card')).forEach(function (card, index) {
        if (card.className === 'finder-card') card.style.backgroundImage = 'url("' + tileImages[index % tileImages.length] + '")';
      });
    }
    var buttons = document.querySelectorAll('[data-destination-filter]');
    var cards = document.querySelectorAll('[data-destination-tags]');
    var empty = document.querySelector('.finder-empty');
    var search = document.querySelector('#destination-search');
    var activeFilter = 'all';
    function updateResults() {
      var query = search ? search.value.trim().toLowerCase() : '';
      var visible = 0;
      cards.forEach(function (card) {
        var matchesFilter = activeFilter === 'all' || card.dataset.destinationTags.split(' ').includes(activeFilter);
        var searchableText = card.textContent.trim().toLowerCase();
        var matchesSearch = !query || searchableText.includes(query);
        var show = matchesFilter && matchesSearch;
        card.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible > 0;
    }
    buttons.forEach(function (button) { button.addEventListener('click', function () {
      activeFilter = button.dataset.destinationFilter;
      if (activeFilter === 'all' && search) search.value = '';
      buttons.forEach(function (item) { var active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active)); });
      updateResults();
    }); });
    if (search) search.addEventListener('input', updateResults);
  }

  function setupBuilder() {
    var builder = document.querySelector('[data-trip-builder]');
    if (!builder) return;
    var form = builder.querySelector('form');
    var result = builder.querySelector('[data-trip-result]');
    var links = {
      lessons: ['Compare surf lessons', '/surf-lessons/westward-ho/'], hire: ['Arrange surf hire', '/surf-hire/westward-ho/'],
      stay: ['Choose where to stay', '/accommodation/westward-ho/'], food: ['Pick food and drink stops', '#food-drink'],
      beach: ['Read the beach guide', '#beach-guide'], things: ['Add things to do', '#things-to-do']
    };
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(form); var needs = data.getAll('need[]');
      if (data.get('length') !== 'day' && !needs.includes('stay')) needs.push('stay');
      if (data.get('experience') === 'first' && !needs.includes('lessons')) needs.unshift('lessons');
      ['beach', 'things'].forEach(function (key) { if (!needs.includes(key)) needs.push(key); });
      var unique = needs.filter(function (item, index) { return needs.indexOf(item) === index; });
      var groupText = data.get('group') === 'family' ? 'family trip' : data.get('group') === 'friends' ? 'trip with friends' : 'coastal trip';
      result.innerHTML = '<h3>Your Westward Ho! starting plan</h3><p class="trip-result-summary">A practical checklist for your ' + groupText + '.</p><ol class="trip-result-list">' + unique.map(function (key) { return '<li><a href="' + links[key][1] + '">' + links[key][0] + ' &#8594;</a></li>'; }).join('') + '</ol><button class="save-trip-button" type="button">Save this plan</button>';
      result.hidden = false; result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      result.querySelector('.save-trip-button').addEventListener('click', function () {
        var saved = getSaved(); var item = { title: 'Westward Ho! trip plan', url: location.pathname + '#plan-trip', steps: unique.length };
        if (!saved.some(function (entry) { return entry.url === item.url; })) saved.push(item);
        setSaved(saved); openDrawer();
      });
    });
  }

  var drawer, toggle;
  function renderSaved() {
    if (!drawer || !toggle) return; var saved = getSaved();
    toggle.textContent = 'My surf trip' + (saved.length ? ' (' + saved.length + ')' : '');
    var list = drawer.querySelector('.saved-trip-items'); var empty = drawer.querySelector('.saved-trip-empty');
    list.innerHTML = saved.map(function (item) { return '<li><a href="' + item.url + '">' + item.title + '</a><small>' + item.steps + ' planning steps</small></li>'; }).join('');
    empty.hidden = saved.length > 0;
  }
  function openDrawer() { drawer.inert = false; drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); toggle.setAttribute('aria-expanded', 'true'); drawer.querySelector('.saved-trip-close').focus(); }
  function setupSavedTrip() {
    toggle = document.createElement('button'); toggle.className = 'saved-trip-toggle'; toggle.type = 'button'; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', 'saved-trip-drawer');
    drawer = document.createElement('aside'); drawer.id = 'saved-trip-drawer'; drawer.className = 'saved-trip-drawer'; drawer.setAttribute('aria-hidden', 'true'); drawer.setAttribute('aria-label', 'Saved surf trip'); drawer.inert = true;
    drawer.innerHTML = '<div class="saved-trip-head"><h2>My surf trip</h2><button class="saved-trip-close" type="button" aria-label="Close saved trip">&times;</button></div><p class="saved-trip-empty">Build and save a plan from the Westward Ho! destination hub.</p><ul class="saved-trip-items"></ul><button class="saved-trip-clear" type="button">Clear saved trip</button>';
    document.body.append(toggle, drawer); renderSaved();
    toggle.addEventListener('click', openDrawer);
    drawer.querySelector('.saved-trip-close').addEventListener('click', function () { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); drawer.inert = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); });
    drawer.querySelector('.saved-trip-clear').addEventListener('click', function () { setSaved([]); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && drawer.classList.contains('is-open')) drawer.querySelector('.saved-trip-close').click(); });
  }

  setupFinder(); setupBuilder();
}());
