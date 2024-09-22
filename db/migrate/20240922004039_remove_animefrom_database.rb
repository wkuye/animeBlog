class RemoveAnimefromDatabase < ActiveRecord::Migration[7.2]
  def change
    drop_table :animes
  end
end
