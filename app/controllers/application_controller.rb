class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  include DeviseWhitelist, SetSource,CurrentUserConcern
 
#what super does is that it gets all the default function of current_user from devise since we are trying to override current_user
#Openstruct creates a mini database let say like a default databse so we created it for devise current_user to act as a guest 

end
