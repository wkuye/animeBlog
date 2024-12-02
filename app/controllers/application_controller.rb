class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  include DeviseWhitelist, SetSource
 
#created a session and passsed a query in our params if it's true
 
end
