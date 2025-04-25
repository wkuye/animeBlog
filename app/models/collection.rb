class Collection < ApplicationRecord
  belongs_to :user
  has_many :anime_collections
  has_many :animes, through: :anime_collections
end
