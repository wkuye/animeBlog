class AddCollectionToAnimes < ActiveRecord::Migration[7.2]
  def change
    add_reference :animes, :collection, null: true, foreign_key: true
  end
end
