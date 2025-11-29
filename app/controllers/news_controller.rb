class NewsController<ApplicationController
before_action :set_news, only: %i[show]
  def  show
    @related_news=News.where.not(slug: @news.slug).limit(4)
  end

  def set_news
    @news= News.friendly.find(params[:slug])
    
  end
end