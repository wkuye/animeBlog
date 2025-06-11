class Blog < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  has_many :anime_genres
  has_many :animes, through: :anime_genres
  validates_presence_of :title, :body, :description, :author, :image, :read, :blog_image
  mount_uploader :blog_image, BlogImageUploader
end
