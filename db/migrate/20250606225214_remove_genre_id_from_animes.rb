class RemoveGenreIdFromAnimes < ActiveRecord::Migration[7.2]
  def change
    remove_reference :animes, :genre, null: false, foreign_key: true
  end
end
