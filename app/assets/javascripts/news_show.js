const showNewsIds = new Set();
let isFirstBatch = true;
// Array to track new cards in the current batch (until the batch styling is complete)
let newCardsBatch = [];

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".news-card").forEach(card => {
        const id = card.getAttribute("news-id");
        if (id) {
           showNewsIds.add(parseInt(id));
        }
    });

  
});

window.showMoreNews = function () {
    console.log("Load more clicked!");

    const params = new URLSearchParams();

    // Pass loaded IDs to the server to avoid reloading them
    showNewsIds.forEach(id => params.append('news_ids[]', id));

    const excludedId = document.body.getAttribute("news-excluded-id");
    params.append('excluded_news_id', excludedId);

    fetch(`/show_more_news?${params.toString()}`, {
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
    .then(data => {
        console.log("Received anime data:", data);
        
        if (!data || data.length === 0) {
            console.warn("No more anime to load!");
       
        }
    
        rendernewsCards(data);
    
    })
}
function rendernewsCards(newsList) {
    const newsContainer = document.querySelector(".news-grid");

    newsList.forEach((news, index) => {
        const card = document.createElement("div");
        card.classList.add("news-card");
        card.setAttribute("news-id", news.id);
        card.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="news-card-image">
          <div class="news-card-overlay">
          <p class="news-time">${formatTimeAgo(news.created_at)}</p>
          <h3 class="news-card-title">${news.title}</h3>
        </div>
        <a href="/news/${news.slug}" class="news-link-absolute"></a>

        `;
       
     

        newsContainer.appendChild(card);
      showNewsIds.add(news.id); // Track loaded IDs
      newCardsBatch.push(card);
     
    });
   
    applyNewsCardStyles();

}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";

    return `${diffInDays} days ago`;
}

function applyNewsCardStyles() {
    if ( newCardsBatch.length === 2) {
        newCardsBatch.forEach(card => {
          card.style.gridColumn = "span 3";
          card.style.height = "250px";
        });
     
        isFirstBatch = false;
      } else if (newCardsBatch.length === 4) {
       
        newCardsBatch.forEach((card, index) => {
          if (index < 3) {
            card.style.gridColumn = "span 2";
            card.style.height = "350px";
          } else {
            card.style.gridColumn = "span 6";
      card.style.height = "250px";
  
          }
        });
       
      }
      else if (newCardsBatch.length === 6) {
  
        newCardsBatch.forEach((card, index) => {
          if (index < 3) {
            card.style.gridColumn = "span 2";
            card.style.height = "350px";
          } else if(index >=3 && index <5){
            card.style.gridColumn = "span 3";
            card.style.height = "250px";
          }else if(index>=5){
            card.style.gridColumn = "span 6";
            card.style.height = "250px";
          }

        });
       
      }
      else if (newCardsBatch.length === 8) {
   
        newCardsBatch.forEach((card, index) => {
          if (index < 3) {
            card.style.gridColumn = "span 2";
            card.style.height = "350px";
          } else if(index >=3 && index < 5){
            card.style.gridColumn = "span 3";
            card.style.height = "250px";
          }else if(index >=5){
            card.style.gridColumn = "span 2";
            card.style.height = "350px";
          }
        });
        newCardsBatch = [];
      }
    }

