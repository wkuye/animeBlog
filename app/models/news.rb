class News < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

has_many :news_animes, dependent: :destroy
has_many :animes, through: :news_animes
accepts_nested_attributes_for :news_animes, allow_destroy: true ##needed for nested links add association
  validates_presence_of :title, :description, :image
end
