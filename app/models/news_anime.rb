class NewsAnime < ApplicationRecord
  belongs_to :news
  belongs_to :anime
end
