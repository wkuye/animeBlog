class Genre < ApplicationRecord
  extend FriendlyId
  has_many :animes
  accepts_nested_attributes_for :animes, reject_if: lambda { |attributes| attributes["title"].blank? }
  validates_presence_of :genre_type, :body, :main_image, :thumb_image
  friendly_id :genre_type, use: :slugged
  scope :senin, -> { where(genre_type: "Shonen #{3}") }
end
