module Placeholder
  extend ActiveSupport::Concern
  def  self.image_generator(height, width)
    "http://via.placeholder.com/#{height}x#{width}"
  end
  def  self.boolean_default(anime)
    anime.airing = true if anime.airing.nil?
  end
end
