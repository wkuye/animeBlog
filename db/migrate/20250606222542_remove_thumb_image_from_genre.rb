class RemoveThumbImageFromGenre < ActiveRecord::Migration[7.2]
  def change
    remove_column :genres, :thumb_image
  end
end
