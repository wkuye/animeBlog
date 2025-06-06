class GenresController < ApplicationController
  before_action :set_genre, only: %i[ show edit destroy update]
  access all: [:show, :index], user: {except: [:destroy, :create, :edit, :new, :update]}, site_admin: :all
  layout "genre"
  def index
    @genres = Genre.all
  end

  def new
    @genre = Genre.new
  end

def show
  @title_default = @genre.genre_type
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
  end
  
  def update
    respond_to do |format|
      if @genre.update(genre_params)
        format.html { redirect_to genres_url(@genres), notice: "Genre was successfully updated." }

      else
        format.html { render :edit, status: :unprocessable_entity }

      end
    end
  end
  def destroy
    @genre.destroy
    respond_to do |format|
      format.html { redirect_to genre_url, notice: "Genre was successfully destroyed." }
    end
  end

  def set_genre
     @genre = Genre.friendly.find(params[:slug])
  end

  private  def genre_params
  params.require(:genre).permit(:genre_type, :body, animes_attributes: [ :title, :description, :airing, :episodes])
end
end
