class NewsController<ApplicationController
before_action :set_news, only: %i[show]
  def  show
    @related_news=News.where.not(slug: @news.slug).limit(4)
  end

def show_more_news
    excluded_news_id = params[:excluded_news_id].to_i if params[:excluded_news_id].present?
    news_ids = (params[:news_ids] || []).to_s.split(",")

    # Ensure that the initially excluded anime is also removed from this query
    news = News.where.not(id: news_ids + [excluded_news_id]).limit(4) # rubocop:disable Layout/SpaceInsideArrayLiteralBrackets
    render json: news
  end

  def set_news
    @news= News.friendly.find(params[:slug])
  end
end