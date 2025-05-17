class PagesController < ApplicationController
  def home
    @int = Anime.ids.sample
    @animes = Anime.where.not(id: @int).limit(6)
    unless current_user.is_a?(GuestUser)
      collection = current_user.collection
      @collection_animes = collection ? collection : []
    end
    @news_int = News.ids.sample
    @news=News.where.not(id: @news_int).limit(7)
  end


  def contact
  end

  def contact_dev
      ContactMailer.contact_email(
      params[:name],
      params[:email],
      params[:message]
    ).deliver_now
      flash[:notice] = "Thanks for reaching out—I'll be in touch soon!"
    redirect_to contact_path
  end

  def load_more_anime
    excluded_id = params[:excluded_id].to_i if params[:excluded_id].present?
    loaded_ids = (params[:loaded_ids] || []).map(&:to_i)

    # Ensure that the initially excluded anime is also removed from this query
    animes = Anime.where.not(id: loaded_ids + [excluded_id]).limit(6)

    render json: animes
  end

  def show_more_news
    excluded_news_id = params[:excluded_news_id].to_i if params[:excluded_news_id].present?
    news_ids = (params[:news_ids] || []).map(&:to_i)

    # Ensure that the initially excluded anime is also removed from this query
    news = News.where.not(id: news_ids + [excluded_news_id]).limit(2) # rubocop:disable Layout/SpaceInsideArrayLiteralBrackets
    render json: news
  end
end
