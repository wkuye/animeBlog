class Anime < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_many :anime_genres, dependent: :destroy
  has_many :genres, through: :anime_genres
  has_many :reviews
  has_many :news_animes
  has_many :news, through: :news_animes
  has_many :anime_collections
  has_many :collections, through: :anime_collections
  includes Placeholder
  validates_presence_of :title, :description, :main_image, :thumb_image,  :episodes, :thumb_video_url
  after_initialize :set_defaults
  def set_defaults
    self.main_image  ||= Placeholder.image_generator(300, 300)
    self.thumb_image ||= Placeholder.image_generator(200, 250)
    self.airing ||= false
  end

  def should_generate_new_friendly_id?
  slug.blank? || title_changed?
  end

end
