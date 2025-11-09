document.addEventListener("DOMContentLoaded", () => {
  console.log("hover_effects.js loaded!");

  const animeContainer = document.getElementById("anime-list");
  const loadMoreBtn =
    document.querySelector(".load-more-overview") ??
    document.querySelector(".load-more");

  if (!animeContainer || !loadMoreBtn) {
    console.warn("Anime container or button not found!");
    return;
  }

  let hideTimeout;

  const showButton = () => {
    clearTimeout(hideTimeout);
    loadMoreBtn.style.opacity = "1";
    loadMoreBtn.style.visibility = "visible";
  };

  const hideButton = () => {
    hideTimeout = setTimeout(() => {
      loadMoreBtn.style.opacity = "0";
      loadMoreBtn.style.visibility = "hidden";
    }, 300);
  };

  // 💡 Use event delegation on the container
  animeContainer.addEventListener("mouseenter", (event) => {
    if (event.target.closest(".anime-card")) {
      showButton();
    }
  }, true);

  animeContainer.addEventListener("mouseleave", (event) => {
    if (event.target.closest(".anime-card")) {
      hideButton();
    }
  }, true);

  loadMoreBtn.addEventListener("mouseenter", showButton);
  loadMoreBtn.addEventListener("mouseleave", hideButton);

  // Reattach after AJAX / Turbo navigation
  document.addEventListener("turbo:load", () => {
    console.log("Turbo load: reattaching hover listeners...");
    window.attachAnimeCardListeners?.();
  });
});
