document.addEventListener("turbo:load", () => {
  const DEFAULT_TAB = "overview";
  const TAB_KEY     = "activeTab";
  const FLAG_KEY    = "restoreTab";

  const tabWrapper  = document.querySelector(".anime-tabs");
  if (!tabWrapper) return;

  const initialFromRails = tabWrapper.dataset.initialTab;
  const tabHeaders = Array.from(tabWrapper.querySelectorAll(".tab-header li"));
  const tabBodies  = Array.from(tabWrapper.querySelectorAll(".tab-body"));
  const form       = document.querySelector("form");

  const shouldRestore = sessionStorage.getItem(FLAG_KEY) === "1";
  const savedTab      = shouldRestore && localStorage.getItem(TAB_KEY);

  const initialTab    = initialFromRails || savedTab || DEFAULT_TAB;

  if (shouldRestore) sessionStorage.removeItem(FLAG_KEY);

  showTab(initialTab);

  // 🔄 Always re-bind listeners after Turbo reload
  tabHeaders.forEach(header =>
    header.addEventListener("click", () => showTab(header.dataset.tab))
  );

  form?.addEventListener("submit", () => {
    const active = tabHeaders.find(h => h.classList.contains("active"));
    if (!active) return;
    localStorage.setItem(TAB_KEY, active.dataset.tab);
    sessionStorage.setItem(FLAG_KEY, "1");
  });

  function showTab(tabId) {
    tabBodies.forEach(b => (b.style.display = "none"));
    tabHeaders.forEach(h => h.classList.remove("active"));

    const body   = tabBodies.find(b => b.id === tabId);
    const header = tabHeaders.find(h => h.dataset.tab === tabId);

    if (body) body.style.display = "block";
    if (header) header.classList.add("active");
  }
});
