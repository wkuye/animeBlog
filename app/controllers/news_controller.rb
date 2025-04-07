class NewsController<ApplicationController
before_action :set_news, only: %i[show]
  def  show
    slug= params[:slug]
    @news=News.find_by(slug:slug)
  end

  def set_news
    @news= News.friendly.find(params[:slug])
    
  end
end