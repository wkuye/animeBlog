module ApplicationHelper
  def login_helper
    if current_user.is_a?(GuestUser)
      (button_to "Log in", new_user_session_path, class: "btn login-btn" ,data:{turbo:false})+
      " ".html_safe +
      (button_to "Get Started", new_user_registration_path, class: "btn register-btn",data:{turbo:false})
    else
   # this combine the register and the login together and the br moves the login to the next line
button_to "Log out", destroy_user_session_path, method: :delete, class: "btn logout-btn"

    end
  end

  def session_helper
   if session[:source]
    greeting=  "thanks for the follow  #{session[:source]}"
   content_tag(:p, greeting, class: "ource-greeting")
   end
  end

  def copyright_generator
  WaleViewTool::Renderer.copyright "Kuye Olawale", "All rights reserved"
  end

  def home_video_thumb_nail_helper(id)
    anime=Anime.find_by_id(id.to_i)
    anime_video= anime.thumb_video_url
    anime_video
  end

  def home_image_thumb(id)
    anime=Anime.find_by_id(id.to_i)
    anime_image= anime.thumb_image
    anime_image
  end

  def home_image_main(id)
    anime=Anime.find_by_id(id.to_i)
    anime_image= anime.main_image
    anime_image
  end

  def anime_details(id)
    anime=Anime.find_by_id(id.to_i)
    anime
  end

  def truncate_after_second_period(text)
    sentences = text.split(".")
    sentences.first(1).join(".") + "."
  end

  def news_thumb(id)
    news= News.find_by_id(id)
    news_image=news.image
    news_image
  end

  def news_thumb_stamp(id)
    news= News.find_by_id(id)
    news_created =news.created_at
  news_now=  distance_of_time_in_words(news_created, Time.now)
    news_now
  end

  def news_thumb_title(id)
    news= News.find_by_id(id)
    news_title =news.title
    news_title
  end

  def get_slug(id)
    news=News.find_by_id(id)
    news_slug=news.slug
    news_slug
  end

  def get_rating(id)
    anime_rating= Rating.find_by(anime_id: id)
    rating= anime_rating.rating
    rating
  end


  def profile_avatar (profile_pic)
    if profile_pic.attached?
     profile_picture= image_tag profile_pic
    else
     profile_picture=image_tag "default_avatar.jpg", size: "100x100"
    end
   profile_picture
  end

  def collection_first_pic(id)
  collection = Collection.find_by_id(id)
  puts "col #{collection&.name}"

  collection_anime = collection&.animes&.first

  if collection_anime&.thumb_image.present?
    collection_anime.thumb_image
  else
    "suit.jpg"
  end
  end


  def star_rating(rating, max = 5)
    content_tag :div, class: "star-rating" do
      (1..max).map do |i|
        classes = [ "fa", "fa-star" ]
        classes << (i <= rating ? "active" : "inactive")
        content_tag(:i, "", class: classes.join(" "))
      end.join.html_safe
    end
  end

  def ids_to_slug(id)
    anime= Anime.find_by_id(id)
    anime_slug= anime.slug
    anime_slug
  end


end
