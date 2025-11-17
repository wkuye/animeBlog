import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="airing-filter"
export default class extends Controller {
  static targets = ["airing"]

  connect() {
    this.keepChecked()
    window.addEventListener("popstate", () => this.keepChecked())
  }

  filter(event) {
    const airing = event.currentTarget.value
    const clickbox = event.currentTarget
    this.filterByAiring(airing, clickbox)
  }

  filterByAiring(airing, clickbox) {
    const params = new URLSearchParams(window.location.search)

    // Only one airing option active at a time
    this.airingTargets.forEach(box => {
      if (box !== clickbox) box.checked = false
    })

    if (clickbox.checked) {
      params.set("airing", airing)
    } else {
      params.delete("airing")
    }

    const url = `/animes?${params.toString()}`
    Turbo.visit(url, { frame: "anime_list" })
  }

  keepChecked() {
    const params = new URLSearchParams(window.location.search)
    const airing = params.get("airing")

    this.airingTargets.forEach(btn => {
      btn.checked = (airing === btn.value)
    })
  }
}

