class SearchController < ApplicationController
  def index
    query = params[:query].to_s.strip
    @animes = unless !query.present?
                Anime.where("title ILIKE ?", "%#{query}%")
    end
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to root_path } # fallback if HTML
    end
  end
end

