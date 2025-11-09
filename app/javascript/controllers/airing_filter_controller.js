import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="rating-filter"
export default class extends Controller {
  static targets=['airing']
  connect() {
    if (!this.airingTarget) {
      console.log('airing target not found')
    }
    this.keepChecked()
  }

  filter(event){

    const airing= event.currentTarget.value
    const clickbox= event.currentTarget
    console.log("genre:", airing)
    console.log("check?:", clickbox)
    this.filterByAiring(airing,clickbox)
   }

    filterByAiring(airing, clickbox) {
      this.airingTargets.forEach(box => {
      if (box !== clickbox) {
        box.checked = false
      }
    })
    const url = clickbox.checked?   `/animes?airing=${airing}`:"/animes"
    Turbo.visit(url, { frame: "anime_list" })
  
  }

   keepChecked(){
    const params = new URLSearchParams(window.location.search)
    const airing= params.get('airing')
    this.airingTargets.forEach(checkbtn=>{
      console.log("checking:", checkbtn)
      if (airing===checkbtn.value) {
        box.checked=true
      }
    })

   }
}
