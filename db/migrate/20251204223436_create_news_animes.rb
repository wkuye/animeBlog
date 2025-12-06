class CreateNewsAnimes < ActiveRecord::Migration[7.2]
  def change
    create_table :news_animes do |t|
      t.references :news, null: false, foreign_key: true
      t.references :anime, null: false, foreign_key: true

      t.timestamps
    end
  end
end
