import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "results"]


 connect(){
    
 this._handleClickOutside = this.handleClickOutside.bind(this)
    document.addEventListener("click", this._handleClickOutside)
 }

  query(event) {
    if(event.target.value.length!==0){

      this.resultsTarget.classList.add("show")
      const value = this.inputTarget.value.trim()
console.log("value:", value)
    clearTimeout(this.timer)

  this.timer = setTimeout(() => {
    event.target.form.requestSubmit()
  }, 200)
    }else{
      this.resultsTarget.classList.remove("show")
    }
  }

  handleClickOutside(event) {
    
    if (!this.element.contains(event.target)) {
     this.resultsTarget.classList.remove("show")
    }
  }

 
}
