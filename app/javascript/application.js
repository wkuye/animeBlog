// app/javascript/application.js
import "@hotwired/turbo-rails"
import { Application } from "@hotwired/stimulus"
import { definitionsFromContext } from "@hotwired/stimulus-webpack-helpers"
import "./channels"

 
const application = Application.start()

// 👇 use relative path, not "controllers"
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
