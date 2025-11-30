import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="show-more-news"
export default class extends Controller {
  static targets = ["list", "button"];

  connect() {
    console.log("connected")
  }

  show(event) {
    const excluded = new Set()
    const newsIds = new Set()

  
    this.listTarget.querySelectorAll(".news-card").forEach(card => {
      newsIds.add(card.dataset.id)
    })

    
    excluded.add(event.currentTarget.dataset.animeId)

    
    const params = new URLSearchParams()
    params.set("excluded_news_id", [...excluded].join(","))
    params.set("news_ids", [...newsIds].join(","))

    console.log("sending IDs:", [...newsIds].join(","))

    fetch(`/show-news?${params.toString()}`)
      .then(r => r.json())
      .then(data => {
        console.log("returned:", data)
        this.appendNews(data)
      })
  }

  appendNews(data) {
    data.forEach(news => {
      const html = `
        <div class="news-card" data-id="${news.id}">
          <h3>${news.title}</h3>
          <div class="pic-des">
            <img src="${news.image}" class="related-image">
            <span class="related-text">
              ${news.description.substring(0, 100)}...
            </span>
          </div>
          <hr>
        </div>
      `

      
      this.listTarget.insertAdjacentHTML("beforeend", html)
    })
  }
}
