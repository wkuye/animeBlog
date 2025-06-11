class CreateAnimeGenres < ActiveRecord::Migration[7.2]
  def change
    create_table :anime_genres do |t|
      t.references :animes, null: false, foreign_key: true
      t.references :genres, null: false, foreign_key: true

      t.timestamps
    end
  end
end
