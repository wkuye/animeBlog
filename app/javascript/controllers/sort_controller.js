import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["smenu"]

  connect() {
    this.isVisible = false
    this.smenuTarget.style.display = "none"

    // Bind listener once
    this._handleClickOutside = this.handleClickOutside.bind(this)
    document.addEventListener("click", this._handleClickOutside)
  }

  disconnect() {
    document.removeEventListener("click", this._handleClickOutside)
  }

  toggle(event) {
    event.stopPropagation() 
    this.isVisible = !this.isVisible
    this.smenuTarget.style.display = this.isVisible ? "block" : "none"
  }

  handleClickOutside(event) {
    
    if (this.isVisible && !this.element.contains(event.target)) {
      this.isVisible = false
      this.smenuTarget.style.display = "none"
    }
  }
}
