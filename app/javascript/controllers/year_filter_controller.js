import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="year-filter"
export default class extends Controller {
  static targets = ["button"]

  connect() {
    console.log("Year filter controller connected!")

    // Set active button based on current URL
    this.syncActiveWithURL()
    
    // Listen for Turbo frame navigation (Back/Forward)
    document.addEventListener("turbo:frame-load", () => {
      this.syncActiveWithURL()
    })
  }

  select(event) {
    // Remove active class from all buttons
    this.buttonTargets.forEach(btn => btn.classList.remove("active"))

    // Add active to the clicked one
    const clicked = event.currentTarget
    clicked.classList.add("active")

    const selectedYear = clicked.dataset.year
    console.log("Selected year:", selectedYear)

    // Trigger filter
    this.filterByYear(selectedYear)
  }

  filterByYear(year) {
    const url = year === "all" ? "/animes" : `/animes?year=${year}`
    Turbo.visit(url, { frame: "anime_list" })
  }

  syncActiveWithURL() {
    const params = new URLSearchParams(window.location.search)// gets http://127.0.0.1:3000/animes?year=2025
    const year = params.get("year") || "all" // gets 2025 or whatever year it is

    this.buttonTargets.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.year === year)
    })
  }
}
