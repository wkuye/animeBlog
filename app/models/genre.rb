class Genre < ApplicationRecord
  extend FriendlyId
    has_many :anime_genres, dependent: :destroy
  has_many :animes, through: :anime_genres
  accepts_nested_attributes_for :anime_genres, reject_if: :all_blank, allow_destroy: true
  validates_presence_of :genre_type, :body
  friendly_id :genre_type, use: :slugged
  scope :senin, -> { where(genre_type: "Shonen #{3}") }
end
