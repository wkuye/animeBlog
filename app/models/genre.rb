class Genre < ApplicationRecord
  validates_presence_of :genre_type, :body, :main_image, :thumb_image

  scope :senin, -> { where(genre_type: "Shonen #{3}") }
end
