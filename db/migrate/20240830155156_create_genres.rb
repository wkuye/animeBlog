class CreateGenres < ActiveRecord::Migration[7.2]
  def change
    create_table :genres do |t|
      t.string :genre_type
      t.text :body
      t.text :main_image
      t.text :thumb_image

      t.timestamps
    end
  end
end
