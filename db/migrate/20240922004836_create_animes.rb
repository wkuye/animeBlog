class CreateAnimes < ActiveRecord::Migration[7.2]
  def change
    create_table :animes do |t|
      t.string :title
      t.string :description
      t.text :main_image
      t.text :thumb_image
      t.boolean :airing
      t.integer :episodes
      t.references :genre, foreign_key: true

      t.timestamps
    end
  end
end
