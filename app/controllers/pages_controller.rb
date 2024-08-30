class PagesController < ApplicationController
  def home
    @anime=Anime.all
  end

  def about
  end

  def contact
  end
end
