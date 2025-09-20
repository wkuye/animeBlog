import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["sheet"]

  connect() {
    console.log("✅ ReviewBottomsheet connected")
    // If Rails rendered it with errors and "active" already on, keep it open
    if (this.sheetTarget.classList.contains("active")) {
      this.open()
    }
  }

  open() {
    this.sheetTarget.classList.add("active")
  }

  close() {
    this.sheetTarget.classList.remove("active")
  }
}
