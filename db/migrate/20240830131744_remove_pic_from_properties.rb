class RemovePicFromProperties < ActiveRecord::Migration[7.2]
  def change
    remove_column :animes, :pic, :string
  end
end
