class CreateAnimeCollections < ActiveRecord::Migration[7.2]
  def change
    create_table :anime_collections do |t|
      t.references :anime, null: false, foreign_key: true
      t.references :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
