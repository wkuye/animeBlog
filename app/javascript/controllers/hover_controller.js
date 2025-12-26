// app/javascript/controllers/hover_effects_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["list", "button"]

  connect() {
 

    this.hideTimeout = null

    // Bind event handlers
    this._onMouseEnter = this._onMouseEnter.bind(this)
    this._onMouseLeave = this._onMouseLeave.bind(this)
    this._onButtonEnter = this._onButtonEnter.bind(this)
    this._onButtonLeave = this._onButtonLeave.bind(this)

    // Attach listeners
    this.listTarget.addEventListener("mouseenter", this._onMouseEnter, true)
    this.listTarget.addEventListener("mouseleave", this._onMouseLeave, true)
    this.buttonTarget.addEventListener("mouseenter", this._onButtonEnter)
    this.buttonTarget.addEventListener("mouseleave", this._onButtonLeave)
  }

  disconnect() {
    if (this.hasListTarget) {
      this.listTarget.removeEventListener("mouseenter", this._onMouseEnter, true)
      this.listTarget.removeEventListener("mouseleave", this._onMouseLeave, true)
    }
    if (this.hasButtonTarget) {
      this.buttonTarget.removeEventListener("mouseenter", this._onButtonEnter)
      this.buttonTarget.removeEventListener("mouseleave", this._onButtonLeave)
    }
  }

  _onMouseEnter(event) {
    if (event.target.closest(".anime-card")) this.show()
  }

  _onMouseLeave(event) {
    if (event.target.closest(".anime-card")) this.hide()
  }

  _onButtonEnter() { this.show() }
  _onButtonLeave() { this.hide() }

  show() {
    clearTimeout(this.hideTimeout)
    if (!this.hasButtonTarget) return
    this.buttonTarget.style.opacity = "1"
    this.buttonTarget.style.visibility = "visible"
  }

  hide() {
    clearTimeout(this.hideTimeout)
    if (!this.hasButtonTarget) return
    this.hideTimeout = setTimeout(() => {
      this.buttonTarget.style.opacity = "0"
      this.buttonTarget.style.visibility = "hidden"
    }, 300)
  }
}
