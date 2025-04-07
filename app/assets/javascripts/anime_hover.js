console.log("hover_effects.js loaded!");

// Define the function globally so it can be used in other files
window.attachAnimeCardListeners = function () {
    console.log("Attaching hover listeners...");

    const animeContainer = document.getElementById("anime-list");
    const loadMoreBtn = document.querySelector('.load-more');

    if (!animeContainer || !loadMoreBtn) {
        console.warn("Anime container or button not found!");
        return;
    }

    let hideTimeout;

    animeContainer.addEventListener('mouseover', (event) => {
        if (event.target.closest('.anime-card')) {
            clearTimeout(hideTimeout);
            loadMoreBtn.style.opacity = '1';
            loadMoreBtn.style.visibility = 'visible';
        }
    });

    animeContainer.addEventListener('mouseout', (event) => {
        if (event.target.closest('.anime-card')) {
            hideTimeout = setTimeout(() => {
                loadMoreBtn.style.opacity = '0';
                loadMoreBtn.style.visibility = 'hidden';
            }, 300);
        }
    });

    loadMoreBtn.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        loadMoreBtn.style.opacity = '1';
        loadMoreBtn.style.visibility = 'visible';
    });

    loadMoreBtn.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            loadMoreBtn.style.opacity = '0';
            loadMoreBtn.style.visibility = 'hidden';
        }, 300);
    });
};
