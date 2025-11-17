import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="genre-filter"
export default class extends Controller {
  static targets = ["gcheck"]

  connect() {
    this.keepChecked()
    window.addEventListener("popstate", () => this.keepChecked())
  }

  filter(event) {
    const genre = event.currentTarget.value
    const clickbox = event.currentTarget
    this.filterByGenre(genre, clickbox)
  }

  filterByGenre(genre, clickbox) {
    const params = new URLSearchParams(window.location.search)

    // Only one genre can be active at a time
    this.gcheckTargets.forEach(box => {
      if (box !== clickbox) box.checked = false
    })

    if (clickbox.checked) {
      params.set("genre", genre)
    } else {
      params.delete("genre")
    }

    const url = `/animes?${params.toString()}`
    Turbo.visit(url, { frame: "anime_list" })
  }

  keepChecked() {
    const params = new URLSearchParams(window.location.search)
    const genre = params.get("genre")

    this.gcheckTargets.forEach(btn => {
      btn.checked = (genre === btn.value)
    })
  }
}
