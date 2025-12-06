class AddNewsToAnime < ActiveRecord::Migration[7.2]
  def change
    add_reference :animes, :news,  foreign_key: true
  end
end
