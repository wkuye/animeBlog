module ApplicationHelper
  def login_helper (style)
    if current_user.is_a?(GuestUser)
      ( link_to "Register", new_user_registration_path, class:style) +
      " ".html_safe +
          (link_to "Login", new_user_session_path, class: style)
    
    else
    #this combine the register and the login together and the br moves the login to the next line 
    link_to "Logout", destroy_user_session_path, method: :delete, class: style
    end 
  end

  def session_helper
   if session[:source] 
    greeting=  "thanks for the follow  #{session[:source]}" 
   content_tag(:p, greeting, class: "ource-greeting")
    end 
    
  end

  def copyright_generator
  WaleViewTool::Renderer.copyright 'Kuye Olawale', 'All rights reserved'
  end
end
