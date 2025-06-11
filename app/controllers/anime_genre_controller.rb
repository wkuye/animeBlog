class AnimeGenresController < ApplicationController
  def create
    @genre = Genre.find(params[:slug])
    @anime_genre = @genre.anime_genres.build(anime_genre_params)

    if @anime_genre.save
      redirect_to @genre, notice: "Anime added to the genre successfully."
    else
      redirect_to new_genre_path, alert: "Failed to add anime. Please try again."
    end
  end

  private

  def anime_genre_params
    params.require(:anime_genre).permit(:anime_id, :genre_id)
  end
end
