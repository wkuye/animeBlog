class RemoveForeignKeyFromAnimes < ActiveRecord::Migration[7.2]
  def change
    remove_foreign_key :animes, :collections
  end
end
