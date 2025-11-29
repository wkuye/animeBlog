class GenresController < ApplicationController
  before_action :set_genre, only: %i[ show edit destroy update]
  access all: [:show, :index], user: {except: [:destroy, :create, :edit, :new, :update]}, site_admin: :all
  layout "genre"
  def index
    @genres = Genre.all
    respond_to do |format|
      format.turbo_stream
      format.html
  end
  end

  def new
    @genre = Genre.new
    @anime_genre=AnimeGenre.new
      @available_animes = Anime.where.not(id: @genre.animes.pluck(:id))
  end

def show
  @title_default = @genre.genre_type
@available_animes = Anime.where.not(id: @genre.animes.pluck(:id))
  @active_letter = params[:letter]&.upcase || "A"
  @genre_letter = @genre.animes.where("title LIKE ?", "#{@active_letter}%").order(:title) .page(params[:page])
end



  def create
    @genre = Genre.new(genre_params)

    respond_to do |format|
      if @genre.save
        format.html { redirect_to genres_url(@genres), notice: "Genre was successfully created." }

      else
        format.html { render :new, status: :unprocessable_entity }

      end
    end
  end

  def edit
    @available_animes = Anime.where.not(id: @genre.animes.pluck(:id))
  end
  
  def update
    respond_to do |format|
      if @genre.update(genre_params)
        format.html { redirect_to genre_show_url(@genre.slug), notice: "Genre was successfully updated." }

      else
        format.html { render :edit, status: :unprocessable_entity }

      end
    end
  end
  def destroy
    @genre.destroy
    respond_to do |format|
      format.html { redirect_to genres_path, notice: "Genre was successfully destroyed." }
    end
  end

  def set_genre
     @genre = Genre.friendly.find(params[:slug])
  end

  private  def genre_params
  params.require(:genre).permit(:genre_type, :body, anime_genres_attributes: [ :id, :anime_id, :_destroy ])
end
end