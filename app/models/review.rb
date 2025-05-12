class Review < ApplicationRecord
  belongs_to :user
  belongs_to :anime
  validates_presence_of :anime_id, :comment,  :user_id
  validates :spoiler, inclusion: { in: [ true, false ] }
  validates :rating, inclusion: {  in: 1..5, message: "must be between 1 and 5"
    }
end
