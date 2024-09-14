class GenresController < ApplicationController
  def index
    @genres = Genre.all
  end

  def new
    @genre = Genre.new
  end

  def show
    @genre = Genre.find(params[:id])
  end



  def create
    @genre = Genre.new(params.require(:genre).permit(:genre_type, :body))

    respond_to do |format|
      if @genre.save
        format.html { redirect_to genres_url(@genres), notice: "Genre was successfully created." }

      else
        format.html { render :new, status: :unprocessable_entity }

      end
    end
  end
  def edit
    @genre = Genre.find(params[:id])
  end
  def update
    @genre = Genre.find(params[:id])
    respond_to do |format|
      if @genre.update(params.require(:genre).permit(:genre_type, :body))
        format.html { redirect_to genres_url(@genres), notice: "Genre was successfully updated." }

      else
        format.html { render :edit, status: :unprocessable_entity }

      end
    end
  end
  def destroy
    @genre = Genre.find(params[:id])
    @genre.destroy
    respond_to do |format|
      format.html { redirect_to genre_url, notice: "Genre was successfully destroyed." }
    end
  end
end
