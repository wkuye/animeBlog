class Genre < ApplicationRecord
  includes Placeholder
  validates_presence_of :genre_type, :body, :main_image, :thumb_image

  scope :senin, -> { where(genre_type: "Shonen #{3}") }

  after_initialize :set_defaults
  def set_defaults
    self.main_image  ||= Placeholder.image_generator(300,300)
    self.thumb_image ||= Placeholder.image_generator(200,250)
  end
end
