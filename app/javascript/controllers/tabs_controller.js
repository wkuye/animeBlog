// app/javascript/controllers/tabs_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { initial: String }

  connect() {
    // Find headers/bodies inside this controller scope
    this.headers = Array.from(this.element.querySelectorAll(".tab-header li"))
    this.bodies  = Array.from(this.element.querySelectorAll(".tab-body"))

    // Determine which tab to show:
    //  - Rails can set data-tabs-initial-value="reviews" for errors
    //  - fallback to 'overview'
    const initial = this.initialValue || "overview"
    this.showTab(initial)

    // Bind clicks (safe because this runs after each Turbo render)
    this.headers.forEach(h => h.addEventListener("click", () => this.showTab(h.dataset.tab)))
  }

  showTab(tabId) {
    // hide all bodies, deactivate headers
    this.bodies.forEach(b => b.style.display = (b.id === tabId ? "block" : "none"))
    this.headers.forEach(h => h.classList.toggle("active", h.dataset.tab === tabId))
  }
}
