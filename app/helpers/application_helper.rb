module ApplicationHelper
  def login_helper
    if current_user.is_a?(User)
     link_to "Logout", destroy_user_session_path, method: :delete
    else
    #this combine the register and the login together and the br moves the login to the next line 
    ( link_to "Register", new_user_registration_path) +
 "<br>".html_safe +
     (link_to "Login", new_user_session_path)
    end 
  end

  def session_helper
   if session[:source] 
    greeting=  "thanks for the follow  #{session[:source]}" 
   content_tag(:p, greeting, class: "ource-greeting")
    end 
    
  end

  def copyright_generator
    @copyright= AnimeViewTool::Renderer.copyright 'Kuye Olawale', 'All rights reserved'
  end
end
