class Anime < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  belongs_to :genre
  has_many :reviews
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
end
