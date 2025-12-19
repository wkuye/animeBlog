// app/javascript/application.js
import "@hotwired/turbo-rails"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"
import "./channels"
import "bootstrap"


// ✅ Ensure jQuery is loaded first and globally available
import * as jQuery from "jquery"
window.$ = window.jQuery = jQuery

// ✅ Then dynamically import Cocoon AFTER jQuery is defined
import("@nathanvda/cocoon").then(() => {
  console.log("✅ Cocoon loaded after jQuery")
})
import "./save_btn"
const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
