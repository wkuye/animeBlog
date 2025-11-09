import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="genre-filter"
export default class extends Controller {
  static targets =["gcheck"]
  connect() {
    console.log("connected")
    if (!this.gcheckTarget) {
      console.warn("no genre Targer")
    }
    this.keepChecked()
  }

   filter(event){

const genre= event.currentTarget.value
const clickbox= event.currentTarget
console.log("genre:", genre)
console.log("check?:", clickbox)
this.filterByGenre(genre,clickbox)

   }

    filterByGenre(genre, clickbox) {
      this.gcheckTargets.forEach(box => {
      if (box !== clickbox) {
        box.checked = false
      }
    })
    const url = clickbox.checked?   `/animes?genre=${genre}`:"/animes"
    Turbo.visit(url, { frame: "anime_list" })
  
  }

   keepChecked(){
    const params = new URLSearchParams(window.location.search)
    const genre= params.get('genre')
    this.gcheckTargets.forEach(checkbtn=>{
      if (genre===checkbtn.value) {
        box.checked=true
      }
    })

   }
}
