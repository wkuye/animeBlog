// app/javascript/controllers/anime_collection_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "firstDot", "secondDot", "userCollections"]

  connect() {
    this.leaveTimeout = null
  }

  show() {
    // Cancel any scheduled hide when mouse comes back
    clearTimeout(this.leaveTimeout)

    this._setVisible(this.panelTarget, "0s")
    this._setVisible(this.firstDotTarget, "0.1s")
    this._setVisible(this.secondDotTarget, "0.3s")
    this._setVisible(this.userCollectionsTarget, "0.5s")
  }

  hide(event) {
    // Delay hiding so small gaps don’t cause flicker
    this.leaveTimeout = setTimeout(() => {
      if (!this.element.contains(event.relatedTarget)) {
        this._setHidden(this.panelTarget, "2.5s")
        this._setHidden(this.firstDotTarget, "0.8s")
        this._setHidden(this.secondDotTarget, "1.5s")
        this._setHidden(this.userCollectionsTarget, "2s")
      }
    }, 200) // 200ms grace period
  }

  // Helpers
  _setVisible(el, delay) {
    el.style.opacity = "1"
    el.style.transform = "translateY(0) scale(1)"
    el.style.pointerEvents = "auto"
    el.style.transitionDelay = delay
  }

  _setHidden(el, delay) {
    el.style.opacity = "0"
    el.style.transform = "translateY(-10px) scale(0.5)"
    el.style.pointerEvents = "none"
    el.style.transitionDelay = delay
  }
}
