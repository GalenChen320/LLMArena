import { models, benchmarks, scores, categories } from "./data/mock_data.js";

// ── State ──
let activeCategory = "All";
let activeModels = new Set(models.map((m) => m.id));
let radarChart = null;
let barChart = null;

// ── Color palette for models ──
const palette = [
  "#6c5ce7", "#00cec9", "#fd79a8", "#fdcb6e", "#e17055",
  "#0984e3", "#00b894", "#d63031", "#a29bfe", "#55efc4",
  "#fab1a0", "#74b9ff",
];

const modelColor = {};
models.forEach((m, i) => {
  modelColor[m.id] = palette[i % palette.length];
});

// ── Init ──
function init() {
  renderCategoryFilter();
  renderSortSelect();
  renderModelToggles();
  renderLeaderboard();
  renderCharts();
  renderBenchmarkGrid();
}

// ── Category Filter ──
function renderCategoryFilter() {
  const container = document.getElementById("categoryFilter");
  const allCats = ["All", ...categories];
  container.innerHTML = allCats
    .map(
      (c) =>
        `<button class="pill ${c === activeCategory ? "active" : ""}" data-cat="${c}">${c}</button>`
    )
    .join("");

  container.addEventListener("click", (e) => {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    activeCategory = pill.dataset.cat;
    container.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    renderLeaderboard();
    renderCharts();
  });
}

// ── Sort Select ──
function renderSortSelect() {
  const select = document.getElementById("sortSelect");
  benchmarks.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = b.name;
    select.appendChild(opt);
  });
  select.addEventListener("change", () => renderLeaderboard());
}

// ── Model Toggles ──
function renderModelToggles() {
  const container = document.getElementById("modelToggles");
  container.innerHTML = models
    .map(
      (m) =>
        `<button class="model-toggle active" data-id="${m.id}">${m.name}</button>`
    )
    .join("");

  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".model-toggle");
    if (!btn) return;
    const id = btn.dataset.id;
    if (activeModels.has(id)) {
      if (activeModels.size <= 1) return; // keep at least one
      activeModels.delete(id);
      btn.classList.remove("active");
    } else {
      activeModels.add(id);
      btn.classList.add("active");
    }
    renderLeaderboard();
    renderCharts();
  });
}

// ── Get filtered benchmarks ──
function getFilteredBenchmarks() {
  if (activeCategory === "All") return benchmarks;
  return benchmarks.filter((b) => b.category === activeCategory);
}

// ── Compute average ──
function computeAvg(modelId, bmList) {
  const s = scores[modelId];
  if (!s) return 0;
  let sum = 0;
  let count = 0;
  for (const bm of bmList) {
    if (s[bm.id] != null) {
      // Normalize to 0-100
      const normalized = (s[bm.id] / bm.maxScore) * 100;
      sum += normalized;
      count++;
    }
  }
  return count > 0 ? sum / count : 0;
}

// ── Leaderboard ──
function renderLeaderboard() {
  const bmList = getFilteredBenchmarks();
  const sortKey = document.getElementById("sortSelect").value;

  // Build header
  const thead = document.querySelector("#leaderboard thead tr");
  thead.innerHTML = `
    <th class="col-rank">#</th>
    <th class="col-model">Model</th>
    <th class="col-provider">Provider</th>
    <th class="col-avg">Avg</th>
    ${bmList.map((b) => `<th class="benchmark-col">${b.name}</th>`).join("")}
  `;

  // Sort models
  const sortedModels = [...models].filter((m) => activeModels.has(m.id));
  if (sortKey === "avg") {
    sortedModels.sort((a, b) => computeAvg(b.id, bmList) - computeAvg(a.id, bmList));
  } else {
    sortedModels.sort((a, b) => (scores[b.id]?.[sortKey] || 0) - (scores[a.id]?.[sortKey] || 0));
  }

  // Find best scores per benchmark
  const bestScores = {};
  for (const bm of bmList) {
    let best = -Infinity;
    for (const m of sortedModels) {
      const v = scores[m.id]?.[bm.id];
      if (v != null && v > best) best = v;
    }
    bestScores[bm.id] = best;
  }

  // Render rows
  const tbody = document.getElementById("leaderboardBody");
  tbody.innerHTML = sortedModels
    .map((m, idx) => {
      const rank = idx + 1;
      const rankClass = rank <= 3 ? `rank-${rank}` : "";
      const avg = computeAvg(m.id, bmList);
      const bmCells = bmList
        .map((bm) => {
          const v = scores[m.id]?.[bm.id];
          if (v == null) return `<td class="benchmark-col">—</td>`;
          const isBest = v === bestScores[bm.id];
          const display = bm.maxScore === 100 ? v.toFixed(1) : v.toFixed(1);
          const barWidth = (v / bm.maxScore) * 100;
          return `
            <td class="benchmark-col score-cell">
              <div class="score-bar" style="width:${barWidth}%;background:${modelColor[m.id]}"></div>
              <span class="score-value ${isBest ? "best-score" : ""}">${display}</span>
            </td>`;
        })
        .join("");

      return `
        <tr>
          <td class="col-rank ${rankClass}">${rank}</td>
          <td class="col-model"><span class="model-name">${m.name}</span></td>
          <td class="col-provider">${m.provider}</td>
          <td class="col-avg">${avg.toFixed(1)}</td>
          ${bmCells}
        </tr>`;
    })
    .join("");

  document.getElementById("modelCount").textContent = `${sortedModels.length} models`;
}

// ── Charts ──
function renderCharts() {
  renderRadarChart();
  renderBarChart();
}

function renderRadarChart() {
  const bmList = getFilteredBenchmarks();
  const activeList = models.filter((m) => activeModels.has(m.id)).slice(0, 6);

  const datasets = activeList.map((m) => ({
    label: m.name,
    data: bmList.map((bm) => {
      const v = scores[m.id]?.[bm.id];
      return v != null ? (v / bm.maxScore) * 100 : 0;
    }),
    borderColor: modelColor[m.id],
    backgroundColor: modelColor[m.id] + "18",
    borderWidth: 2,
    pointRadius: 3,
    pointBackgroundColor: modelColor[m.id],
  }));

  if (radarChart) radarChart.destroy();
  radarChart = new Chart(document.getElementById("radarChart"), {
    type: "radar",
    data: {
      labels: bmList.map((b) => b.name),
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            color: "#55556a",
            backdropColor: "transparent",
            font: { size: 10 },
          },
          grid: { color: "#1e1e2e" },
          angleLines: { color: "#1e1e2e" },
          pointLabels: {
            color: "#8888a0",
            font: { size: 11 },
          },
        },
      },
      plugins: {
        legend: {
          labels: { color: "#8888a0", font: { size: 11 }, usePointStyle: true, pointStyle: "circle" },
        },
      },
    },
  });
}

function renderBarChart() {
  const bmList = getFilteredBenchmarks();
  const activeList = models.filter((m) => activeModels.has(m.id)).slice(0, 8);

  const datasets = activeList.map((m) => ({
    label: m.name,
    data: bmList.map((bm) => {
      const v = scores[m.id]?.[bm.id];
      return v != null ? (v / bm.maxScore) * 100 : 0;
    }),
    backgroundColor: modelColor[m.id] + "cc",
    borderColor: modelColor[m.id],
    borderWidth: 1,
    borderRadius: 4,
  }));

  if (barChart) barChart.destroy();
  barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: bmList.map((b) => b.name),
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: "#8888a0", font: { size: 10 }, maxRotation: 45 },
          grid: { color: "#1e1e2e" },
        },
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: "#55556a", font: { size: 10 } },
          grid: { color: "#1e1e2e" },
        },
      },
      plugins: {
        legend: {
          labels: { color: "#8888a0", font: { size: 11 }, usePointStyle: true, pointStyle: "rect" },
        },
      },
    },
  });
}

// ── Benchmark Grid ──
function renderBenchmarkGrid() {
  const grid = document.getElementById("benchmarkGrid");
  grid.innerHTML = benchmarks
    .map(
      (b) => `
      <div class="benchmark-card">
        <div class="bm-name">${b.name}</div>
        <span class="bm-category">${b.category}</span>
        <p class="bm-desc">${b.description}</p>
      </div>`
    )
    .join("");
}

// ── Boot ──
document.addEventListener("DOMContentLoaded", init);
