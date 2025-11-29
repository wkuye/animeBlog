module Search
  extend ActiveSupport::Concern

  included do
    before_action :search
  end

  def search
  @anime_search = if params[:query].present?
              Anime.where("title ILIKE ?", "%#{params[:query]}%")
            else
              Anime.all
  end
end
end
