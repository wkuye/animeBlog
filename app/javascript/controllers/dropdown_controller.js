import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="dropdown"
export default class extends Controller {
  static targets = ["menu"]

  connect() {
    console.log("dropdown controller connected!")

   
  }

  toggle(event) {
    if (this.isVisible) {
      this.hide(event.currentTarget)
    } else {
      this.show(event.currentTarget)
    }
  }

  show(icon) {
    console.log("Showing year filter")
    icon.classList.remove("fa-chevron-up")
    icon.classList.add("fa-chevron-down")
    this.menuTarget.style.display = "flex"
    this.isVisible = true
  }

  hide(icon) {
    console.log("Hiding year filter")
    icon.classList.remove("fa-chevron-down")
    icon.classList.add("fa-chevron-up")
    this.menuTarget.style.display = "none"
    this.isVisible = false
  }
}
