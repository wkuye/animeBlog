document.addEventListener("DOMContentLoaded", () => {
  const DEFAULT_TAB  = "overview";
  const TAB_KEY      = "activeTab";
  const FLAG_KEY     = "restoreTab";

  const tabHeader   = document.querySelector(".tab-header");
  const tabHeaders  = Array.from(document.querySelectorAll(".tab-header li"));
  const tabBodies   = Array.from(document.querySelectorAll(".tab-body"));
  const form        = document.querySelector("form");

  // ▶️ Did we just submit the form? (flag is set)
  const shouldRestore = sessionStorage.getItem(FLAG_KEY) === "1";

  // ▶️ Decide which tab to show
  const savedTab     = shouldRestore && localStorage.getItem(TAB_KEY);
  const initialTab   = savedTab || DEFAULT_TAB;

  // ▶️ Clean up the one‑time flag
  if (shouldRestore) {
    sessionStorage.removeItem(FLAG_KEY);
  }

  // ▶️ Show it
  showTab(initialTab);


  // ─── Tab clicks just switch UI ───
  tabHeaders.forEach(header =>
    header.addEventListener("click", () => showTab(header.dataset.tab))
  );


  // ─── On form submit: save tab + mark flag ───
  form?.addEventListener("submit", () => {
    const active = tabHeaders.find(h => h.classList.contains("active"));
    if (!active) return;

    localStorage.setItem(TAB_KEY, active.dataset.tab);
    sessionStorage.setItem(FLAG_KEY, "1");
  });


  // ─── Helper to show/hide & set tab‑index ───
  function showTab(tabId) {
    tabBodies.forEach(b => b.style.display = "none");
    tabHeaders.forEach(h => h.classList.remove("active"));

    const body   = document.getElementById(tabId);
    const header = tabHeaders.find(h => h.dataset.tab === tabId);

    if (body)   body.style.display = "block";
    if (header) header.classList.add("active");

  }
});
