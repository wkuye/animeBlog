class AnimesController< ApplicationController
  before_action :set_animes, only: %i[show ]
  access all: [:show, :index], user: {except: [:destroy, :create, :edit, :new]}, site_admin: :all
  def show
    unless current_user.is_a?(GuestUser)
      @user_collections = current_user.collection
    end
 @animes=Anime.where.not(id: @anime.id).limit(6)
 @reviews=Review.where(anime_id: @anime.id).order(created_at: :desc).all
 @review  = @anime.reviews.build  # for the form
  end

     def index
     @genres=Genre.all

        if params[:year].present? && params[:year] != "all"
         @animes = Anime.where(year: params[:year])
        else 
        @animes = Anime.all
        end
  
        if params[:genre].present?
         @animes = Genre.where(genre_type: params[:genre]).first.animes
        end
         if params[:airing].present?
         @animes = Anime.where(airing: params[:airing])
         end
        respond_to do |format|
        format.html # normal page load
        format.turbo_stream # for Turbo updates
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

  def load_more_anime
    excluded_overview_id = params[:excluded_overview_id].to_i if params[:excluded_overview_id].present?
    loaded_overview_ids = (params[:loaded_overview_ids] || []).map(&:to_i)
    # Ensure that the initially excluded anime is also removed from this query
    animes = Anime.where.not(id: loaded_overview_ids + [excluded_overview_id]).limit(6)
    render json: animes
  end
end
