module BlogsHelper
 def markdown(text)
    renderer = Redcarpet::Render::HTML.new(filter_html: true, hard_wrap: true)
    markdown = Redcarpet::Markdown.new(
      renderer,
      autolink: true,
      tables: true,
      fenced_code_blocks: true,
      strikethrough: true
    )
    markdown.render(text).html_safe
 end

 def getUserName(id)
   user= User.find_by_id(id)
   username =user.name
   username
 end

  def profile_pic (id)
    user=User.find_by_id(id)
    profile_pic=user.profile_picture
    if profile_pic.attached?
     profile_picture= image_tag profile_pic
    else
     profile_picture=image_tag "default_avatar.jpg", size: "100x100"
    end
   profile_picture
  end
 
end
