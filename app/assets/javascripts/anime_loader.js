const loadedAnimeIds = new Set();


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".anime-card").forEach(card => {
        const id = card.getAttribute("data-id");
        if (id) {
            loadedAnimeIds.add(parseInt(id));
        }
    });

    if (typeof window.attachAnimeCardListeners === "function") {
        window.attachAnimeCardListeners();
    }
});

window.loadMoreAnime = function () {
    console.log("Load more clicked!");

    const params = new URLSearchParams();

    // Pass loaded IDs to the server to avoid reloading them
    loadedAnimeIds.forEach(id => params.append('loaded_ids[]', id));
    const excludedId = document.body.getAttribute("data-excluded-id");
    params.append('excluded_id', excludedId);

    fetch(`/load_more_anime?${params.toString()}`, {
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
    .then(data => {
        console.log("Received anime data:", data);
    
        const animeContainer = document.getElementById("anime-list");
    
        if (!data || data.length === 0) {
            console.warn("No more anime to load!");
       
            loadedAnimeIds.clear();
            animeContainer.innerHTML = "";
    
            fetch(`/load_more_anime?reset=true&excluded_id=${excludedId}`, {
                headers: { 'Accept': 'application/json' }
            })
            .then(response => response.json())
            .then(fullData => {
                renderAnimeCards(fullData);
                ensureLoadMoreVisibility();  
                // ✅ Ensure button listeners are reattached
                if (typeof window.attachAnimeCardListeners === "function") {
                    window.attachAnimeCardListeners();
                }
            })
            .catch(error => console.error("Error reloading full anime list:", error));
    
            return;
        }
    
        renderAnimeCards(data);
    
        // ✅ Ensure button listeners are reattached
        if (typeof window.attachAnimeCardListeners === "function") {
            window.attachAnimeCardListeners();
        }
    })
}
function renderAnimeCards(animeList) {
    const animeContainer = document.getElementById("anime-list");

 
    animeContainer.querySelectorAll(".anime-card").forEach(card => card.remove());

    animeList.forEach((anime, index) => {
        const card = document.createElement("div");
        card.classList.add("anime-card");
        card.setAttribute("data-id", anime.id);
        const height = 228;
        const width = 200;
        const iframeSrc = `${anime.thumb_video_url}?autoplay=1&mute=1&modestbranding=1&controls=0&loop=1`;
        const pageType = document.body.getAttribute("data-page-type");
const isShowPage = pageType === "show";
        card.innerHTML = `
           <iframe 
          width="${width}px" 
          height="${height}px"
          src="${iframeSrc}" 
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen 
          frameborder="0">
        </iframe>
            <img src="${anime.thumb_image}" alt="${anime.title}" class="card-image">
            <h3>${anime.title}</h3>
            <p>${anime.year}</p>
            <a href="/animes/${anime.slug}" class="anime-link"></a>
        `;
        if (isShowPage) {
            card.innerHTML += `
              <div class="top-container-rating">
                <i class="fas fa-star star-icon"></i>
                <p>${anime.rating}</p>
              </div>
            `;
          }else{
                  card.innerHTML += `
              <div class="top-kon-rating">
                <i class="fas fa-star star-icon"></i>
                <p>${anime.rating}</p>
              </div>
            `;
          }

        // Animation delay for smooth appearance
        card.style.animationDelay = `${index * 0.3}s`;

        animeContainer.appendChild(card);
        loadedAnimeIds.add(anime.id); // Track loaded IDs
    });

    // ✅ Reattach listeners after rendering
    setTimeout(() => {
        if (typeof window.attachAnimeCardListeners === "function") {
            window.attachAnimeCardListeners();
        }
     
    }, 100);
}

function ensureLoadMoreVisibility() {
    const loadMoreBtn = document.querySelector('.load-more'); // ✅ Correct selector
    if (!loadMoreBtn) return;

    loadMoreBtn.style.opacity = '1';
    loadMoreBtn.style.visibility = 'visible';
    loadMoreBtn.style.display = 'block'; // Ensure it's visible
}
