class Collection < ApplicationRecord
  belongs_to :user
  validates_presence_of :name,  :user_id
  has_many :anime_collections
  has_many :animes, through: :anime_collections
end
