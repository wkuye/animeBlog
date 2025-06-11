class RemoveMainImageFromGenre < ActiveRecord::Migration[7.2]
  def change
    remove_column :genres, :main_image
  end
end
