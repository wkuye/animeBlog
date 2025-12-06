class NewsController<ApplicationController
before_action :set_news, only: %i[show edit update destroy]
  def show
    @related_news=News.where.not(slug: @news.slug).limit(4)
    @animes=@news.animes
  end

  def edit
   @animes=Anime.where.not(id: @news.animes.pluck(:id))
  end

 

 def destroy
  
 end


  def update
    respond_to do |format|
      if @news.update(news_params)
        format.html { redirect_to news_url(@news.slug), notice: "News was successfully updated." }

      else
        format.html { render :edit, status: :unprocessable_entity }

      end
    end
  end


   def new
   @news= News.new
   @animes=Anime.where.not(id:@news.animes.pluck(:id))
   end

  def create
    @news=News.create(news_params)
respond_to do |format|
    if @news.save
       format.html { redirect_to root_path, notice: "News was successfully created." }
    else
      format.html { render :new, status: :unprocessable_entity }
    end
  end
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

  def news_params
   params.require(:news).permit(:image, :description, :title, news_animes_attributes: [ :id, :anime_id, :_destroy ])
  end
end