class AnimesController< ApplicationController
  before_action :set_animes, only: %i[show  edit update destroy]
  access all: [:show, :index ], user: {except: [:destroy, :create, :edit, :new, ]}, site_admin: :all
  def show
    unless current_user.is_a?(GuestUser)
      @user_collections = current_user.collection
    end
 @animes=Anime.where.not(id: @anime.id).limit(6)
 @reviews=Review.where(anime_id: @anime.id).order(created_at: :desc).all
 @review  = @anime.reviews.build  # for the form
  end

  def edit
 
  end

  def new
   @anime= Anime.new
   @genres= Genre.all
  end

  # animes_controller.rb
def create
  @anime = Anime.new(anime_params)
  if @anime.save
    respond_to do |format|
      format.html { redirect_to animes_path, notice: "Anime created successfully." }
      format.turbo_stream
    end
  else
    respond_to do |format|
      format.html { render :new, status: :unprocessable_entity }
    end
  end
end


def destroy
    @anime.destroy!

    respond_to do |format|
      format.html { redirect_to animes_url, notice: "Anime was successfully destroyed." }
      format.json { head :no_content }
    end
  end


     def index
  @genres = Genre.all

  @animes = Anime.all

  # YEAR FILTER
  if params[:year].present? && params[:year] != "all"
    @animes = @animes.where(year: params[:year])
  end

  
  
  # GENRE FILTER
  if params[:genre].present?
    genre = Genre.find_by(genre_type: params[:genre])
    @animes = @animes.joins(:genres).where(genres: { id: genre.id }) if genre
  end

  # AIRING FILTER
  if params[:airing].present?
    @animes = @animes.where(airing: params[:airing])
  end

  case params[:sort]
    when "title"
      @animes = @animes.order(title: :asc)
    when "rating"
      @animes = @animes.order(rating: :desc)
    when "latest"
      @animes = @animes.order(created_at: :desc)
    end

  respond_to do |format|
      format.turbo_stream
      format.html
  end
     end

      def update
    respond_to do |format|
      if @anime.update(anime_params)
        format.html { redirect_to anime_path(@anime.slug), notice: "Anime was successfully updated." }

      else
        format.html { render :edit, status: :unprocessable_entity }

      end
       end
      end



  def set_animes
    @anime=Anime.friendly.find(params[:slug])
    @review_error=false
  end

  def add_collection
    anime = Anime.friendly.find(params[:slug])
  selected_collection= Collection.where(id: params[:collection_id])
  unless selected_collection.first.animes.exists?(anime.id)
     selected_collection.first.animes<<anime
   redirect_to anime_path(anime), notice: "Added #{anime.title} to #{selected_collection.name}"
  end
 
  end

  def anime_params
      params.require(:anime).permit(:title, :description, :main_image, :thumb_image, :airing, :episodes, :thumb_video_url, :year, :rating, :genre_ids)
  end
end
