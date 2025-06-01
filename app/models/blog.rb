class Blog < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  validates_presence_of :title, :body, :description, :author, :image, :read, :blog_image
  mount_uploader :blog_image, BlogImageUploader
end
