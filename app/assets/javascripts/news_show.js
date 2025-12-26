// Track shown news IDs
const showNewsIds = new Set();
let newCardsBatch = [];

// Media queries
const mobile480 = window.matchMedia("(max-width: 480px)");
const mobile800 = window.matchMedia("(max-width: 800px)");

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".news-card").forEach(card => {
    const id = card.getAttribute("news-id");
    if (id) showNewsIds.add(parseInt(id));
  });
});

// ===============================
// LOAD MORE
// ===============================
window.showMoreNews = function () {
  const params = new URLSearchParams();

  showNewsIds.forEach(id => params.append("news_ids[]", id));

  const excludedId = document.body.getAttribute("news-excluded-id");
  params.append("excluded_news_id", excludedId);

  fetch(`/show_more_news?${params.toString()}`, {
    headers: { Accept: "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) return;
      renderNewsCards(data);
    })
    .catch(console.error);
};

// ===============================
// RENDER CARDS
// ===============================
function renderNewsCards(newsList) {
  

  newsList.forEach(news => {
    const newsContainer = document.querySelector(".news-grid");
    const card = document.createElement("div");
    card.classList.add("news-card");
    card.setAttribute("news-id", news.id);

    card.innerHTML = `
      <img src="${news.image}" class="news-card-image">
      <div class="news-card-overlay">
        <p class="news-time">${formatTimeAgo(news.created_at)}</p>
        <h3 class="news-card-title">${news.title}</h3>
      </div>
      <a href="/news/${news.slug}" class="news-link-absolute"></a>
    `;

    newsContainer.appendChild(card);
    showNewsIds.add(news.id);
    newCardsBatch.push(card);
  });

  applyNewsCardStyles();
}

// ===============================
// TIME FORMAT
// ===============================
function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now - date) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

// ===============================
// GRID SPAN HELPER
// ===============================
function setGridSpan(card, desktopSpan, height) {
  const newsContainer = document.querySelector(".news-grid");
 

  if (mobile800.matches) {
    card.style.gridColumn = "span 3";
    card.style.height = "250px";
  } else{
     if(mobile480.matches){
    newsContainer.style.display="flex";
    newsContainer.style.flexDirection ="column";
    card.style.width="100%";
    card.style.height = "250px";
  }else{
    card.style.gridColumn = desktopSpan;
    card.style.height = height;
  }
  }

    
  
}

// ===============================
// APPLY STYLES
// ===============================
function applyNewsCardStyles() {
  const count = newCardsBatch.length;

  if (count === 2) {
    newCardsBatch.forEach(card =>
      setGridSpan(card, "span 3", "250px")
    );

  } else if (count === 4) {
    newCardsBatch.forEach((card, i) => {
      if (i < 3) {
        setGridSpan(card, "span 2", "350px");
      } else {
        setGridSpan(card, "span 6", "250px");
      }
    });

  } else if (count === 6) {
    newCardsBatch.forEach((card, i) => {
      if (i < 3) {
        setGridSpan(card, "span 2", "350px");
      } else if (i < 5) {
        setGridSpan(card, "span 3", "250px");
      } else {
        setGridSpan(card, "span 6", "250px");
      }
    });

  } else if (count === 8) {
    newCardsBatch.forEach((card, i) => {
      if (i < 3) {
        setGridSpan(card, "span 2", "350px");
      } else if (i < 5) {
        setGridSpan(card, "span 3", "250px");
      } else {
        setGridSpan(card, "span 2", "350px");
      }
    });

    newCardsBatch = [];
  }
}

// ===============================
// REAPPLY ON RESIZE
// ===============================
[mobile480, mobile800].forEach(mq =>
  mq.addEventListener("change", applyNewsCardStyles)
);
