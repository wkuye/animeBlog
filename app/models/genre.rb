class Genre < ApplicationRecord
  validates_presence_of :genre_type, :body, :main_image, :thumb_image

  scope :senin, -> { where(genre_type: "Shonen #{3}") }

  after_initialize :set_defaults
  def set_defaults
    self.main_image  ||= "http://via.placeholder.com/600x400"
    self.thumb_image ||= "http://via.placeholder.com/300x200"
  end
end
