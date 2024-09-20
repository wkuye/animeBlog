class Genre < ApplicationRecord
  validates_presence_of :genre_type, :body
end
