class AddCascadeDeleteToAnimesGenre < ActiveRecord::Migration[7.2]
  def change
      # Remove the existing foreign key if it exists
      remove_foreign_key :animes, :genres

      # Add the foreign key again with on_delete: :cascade
      add_foreign_key :animes, :genres, on_delete: :cascade
  end
end
