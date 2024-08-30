class CreateAnimes < ActiveRecord::Migration[7.2]
  def change
    create_table :animes do |t|
      t.string :title
      t.string :about
      t.string :pic
      t.boolean :airing
      t.integer :episodes


      t.timestamps
    end
  end
end
