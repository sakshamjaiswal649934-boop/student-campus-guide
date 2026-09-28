// Student Campus Guide - GitHub Pages friendly JavaScript
// Edit the LOCATIONS array below if you have the exact official campus building names.

const LOCATIONS = [
  {
    name: "KL University Campus",
    category: "Academic",
    description: "Main KL University campus area at Vaddeswaram.",
    destination: "K L University, Vaddeswaram, Andhra Pradesh 522501"
  },
  {
    name: "Library",
    category: "Library",
    description: "University library and study resources.",
    destination: "Library, K L University, Vaddeswaram, Andhra Pradesh 522501"
  },
  {
    name: "Academic Buildings",
    category: "Academic",
    description: "Academic area for classrooms, departments and student activities.",
    destination: "K L University Academic Block, Vaddeswaram, Andhra Pradesh 522501"
  },
  {
    name: "Computer Labs",
    category: "Labs",
    description: "Computer laboratory area for practical sessions.",
    destination: "Computer Lab, K L University, Vaddeswaram, Andhra Pradesh 522501"
  },
  {
    name: "Canteen",
    category: "Canteen",
    description: "Campus food and refreshment area.",
    destination: "Canteen, K L University, Vaddeswaram, Andhra Pradesh 522501"
  },
  {
    name: "Hostel Area",
    category: "Hostel",
    description: "Student residential area.",
    destination: "KL University Hostel, Vaddeswaram, Andhra Pradesh 522501"
  },
  {
    name: "Sports Area",
    category: "Sports",
    description: "Campus sports and recreation facilities.",
    destination: "Sports Ground, K L University, Vaddeswaram, Andhra Pradesh 522501"
  }
];

const TOUR_STOPS = [
  {
    title: "Start at the Campus",
    desc: "Begin with the main KL University campus area and get familiar with the overall location."
  },
  {
    title: "Find Academic Areas",
    desc: "Use the directory to locate academic buildings and other places you need for classes."
  },
  {
    title: "Explore the Library",
    desc: "Find the library quickly when you need a quiet place for study and academic resources."
  },
  {
    title: "Find Labs & Facilities",
    desc: "Search for labs, canteen, hostel and sports facilities from one campus directory."
  }
];

let activeCategory = "All";
let selectedLocation = null;
let tourIndex = 0;

const $ = (selector) => document.querySelector(selector);

function directionsUrl(destination) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=walking`;
}

function searchUrl(destination) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
}

function selectLocation(index) {
  selectedLocation = LOCATIONS[index];
  const item = selectedLocation;

  $("#infoPanel").innerHTML = `
    <span class="cat-pill">${escapeHtml(item.category)}</span>
    <h3>${escapeHtml(item.name)}</h3>
    <div class="info-row"><span class="k">About</span><span>${escapeHtml(item.description)}</span></div>
    <div class="info-row"><span class="k">Location</span><span>${escapeHtml(item.destination)}</span></div>
    <div class="info-actions">
      <button class="btn-primary" onclick="openDirections(${index})">Get Directions</button>
      <button class="btn-ghost" onclick="openMapSearch(${index})">Open in Google Maps</button>
    </div>
  `;

  document.querySelector("#map").scrollIntoView({ behavior: "smooth" });
}

function openDirections(index) {
  window.open(directionsUrl(LOCATIONS[index].destination), "_blank", "noopener,noreferrer");
}

function openMapSearch(index) {
  window.open(searchUrl(LOCATIONS[index].destination), "_blank", "noopener,noreferrer");
}

function renderLocations() {
  const grid = $("#resultsGrid");
  const query = ($("#searchInput")?.value || "").trim().toLowerCase();

  const filtered = LOCATIONS
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => activeCategory === "All" || item.category === activeCategory)
    .filter(({ item }) => {
      if (!query) return true;
      return `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(query);
    });

  grid.innerHTML = filtered.map(({ item, index }) => `
    <article class="result-card">
      <span class="cat-pill">${escapeHtml(item.category)}</span>
      <h4>${escapeHtml(item.name)}</h4>
      <p>${escapeHtml(item.description)}</p>
      <div class="result-buttons">
        <button class="view-map" onclick="selectLocation(${index})">View on map</button>
        <button class="get-direction" onclick="openDirections(${index})">Directions</button>
      </div>
    </article>
  `).join("");

  $("#noResults").style.display = filtered.length ? "none" : "block";
}

function filterByCat(category) {
  activeCategory = category;
  document.querySelectorAll(".chip").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === category);
  });
  renderLocations();
}

function setupFilters() {
  document.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => filterByCat(btn.dataset.cat));
  });

  $("#searchInput").addEventListener("input", renderLocations);
}

function setupHeroSearch() {
  const input = $("#heroSearch");
  const suggest = $("#suggest");
  const searchButton = document.querySelector(".search-board button");

  function showSuggestions() {
    const query = input.value.trim().toLowerCase();
    if (!query) {
      suggest.classList.remove("show");
      suggest.innerHTML = "";
      return;
    }

    const matches = LOCATIONS
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => `${item.name} ${item.category}`.toLowerCase().includes(query))
      .slice(0, 6);

    suggest.innerHTML = matches.length
      ? matches.map(({ item, index }) => `
          <div class="suggest-item" onclick="selectLocation(${index}); closeSuggestions();">
            <span>${escapeHtml(item.name)}</span>
            <span class="cat">${escapeHtml(item.category)}</span>
          </div>
        `).join("")
      : `<div class="suggest-item"><span>No matching location</span></div>`;

    suggest.classList.add("show");
  }

  input.addEventListener("input", showSuggestions);
  input.addEventListener("focus", showSuggestions);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      runHeroSearch();
    }
    if (event.key === "Escape") closeSuggestions();
  });

  searchButton.addEventListener("click", runHeroSearch);

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-board")) closeSuggestions();
  });
}

function runHeroSearch() {
  const query = $("#heroSearch").value.trim().toLowerCase();
  if (!query) {
    $("#search").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const index = LOCATIONS.findIndex(item =>
    `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(query)
  );

  if (index >= 0) {
    selectLocation(index);
  } else {
    $("#searchInput").value = query;
    activeCategory = "All";
    document.querySelectorAll(".chip").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.cat === "All");
    });
    renderLocations();
    $("#search").scrollIntoView({ behavior: "smooth" });
  }
}

function closeSuggestions() {
  $("#suggest").classList.remove("show");
}

function renderTour() {
  $("#tourRail").innerHTML = TOUR_STOPS.map((stop, index) => `
    <div class="tour-stop ${index === tourIndex ? "active" : ""}" onclick="setTourStop(${index})">
      <div class="tour-dot">${index + 1}</div>
      <div class="stop-label">${escapeHtml(stop.title)}</div>
    </div>
  `).join("");

  const stop = TOUR_STOPS[tourIndex];
  $("#tourStepLabel").textContent = `Stop ${tourIndex + 1}`;
  $("#tourTitle").textContent = stop.title;
  $("#tourDesc").textContent = stop.desc;
}

function setTourStop(index) {
  tourIndex = Math.max(0, Math.min(index, TOUR_STOPS.length - 1));
  renderTour();
}

function setupTour() {
  $("#tourPrev").addEventListener("click", () => {
    setTourStop((tourIndex - 1 + TOUR_STOPS.length) % TOUR_STOPS.length);
  });

  $("#tourNext").addEventListener("click", () => {
    setTourStop((tourIndex + 1) % TOUR_STOPS.length);
  });

  renderTour();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  setupHeroSearch();
  setupTour();
  renderLocations();
});
