class PagesController < ApplicationController

  def home
    @animes=Anime.all
  end

  def about
  end

  def contact
  end

end
