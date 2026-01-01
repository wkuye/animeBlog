import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  connect() {
    this.syncActiveWithURL()
    window.addEventListener("popstate", () => this.syncActiveWithURL())
  }

  select(event) {
    this.buttonTargets.forEach(btn => btn.classList.remove("active"))
    const clicked = event.currentTarget
    clicked.classList.add("active")
    this.filterByYear(clicked.dataset.year)
  }

  filterByYear(year) {
    const params = new URLSearchParams(window.location.search)

    if (year === "all") {
      params.delete("year")
    } else {
      params.set("year", year)
    }

    const query = params.toString()
    const url = `/animes${query ? `?${query}` : ""}`

    history.pushState({}, "", url)
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
