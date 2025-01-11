class Anime < ApplicationRecord
  belongs_to :genre
  includes Placeholder
  validates_presence_of :title, :description, :main_image, :thumb_image, :airing, :episodes, :thumb_video_url
  after_initialize :set_defaults
  def set_defaults
    self.main_image  ||= Placeholder.image_generator(300,300)
    self.thumb_image ||= Placeholder.image_generator(200,250)
    self.airing ||= Placeholder.boolean_default(self)
  end
end

