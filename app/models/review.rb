class Review < ApplicationRecord
  belongs_to :user
  belongs_to :anime
  validates_presence_of :anime_id, :comment,  :user_id
  validates :spoiler, inclusion: { in: [ true, false ] }
end
