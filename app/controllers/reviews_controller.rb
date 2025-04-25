class ReviewsController < ApplicationController
  before_action :set_anime
  def create
    anime  = Anime.find_by!(slug: params[:anime_slug])
    @review = anime.reviews.build(review_params)
    @review.user = current_user

    if @review.save
      redirect_to anime_path(anime), notice: "Review posted!"
    else
        Rails.logger.debug "Review errors: #{@review.errors.full_messages.inspect}"
        render "animes/show", status: :unprocessable_entity
    end
  end


  def set_anime
    @anime = Anime.find_by!(slug: params[:anime_slug])
    @animes=Anime.where.not(id: @anime.id).limit(6)
    @reviews=Review.where(anime_id: @anime.id).order(created_at: :desc).all
    @review_error=true
  end

  def review_params
    params.require(:review).permit(:comment, :rating, :spoiler)
  end
end
