import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="year-filter"
export default class extends Controller {
  static targets = ["button"]

  connect() {
    this.syncActiveWithURL()
    document.addEventListener("turbo:frame-load", () => this.syncActiveWithURL())
    window.addEventListener("popstate", () => this.syncActiveWithURL())
  }

  select(event) {
    this.buttonTargets.forEach(btn => btn.classList.remove("active"))
    const clicked = event.currentTarget
    clicked.classList.add("active")
    const selectedYear = clicked.dataset.year
    this.filterByYear(selectedYear)
  }

  filterByYear(year) {
    const params = new URLSearchParams(window.location.search)

    if (year === "all") {
      params.delete("year")
    } else {
      params.set("year", year)
    }

    const url = `/animes?${params.toString()}`
    Turbo.visit(url, { frame: "anime_list" })
  }

  syncActiveWithURL() {
    const params = new URLSearchParams(window.location.search)
    const year = params.get("year") || "all"

    this.buttonTargets.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.year === year)
    })
  }
}
