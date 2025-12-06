class RemoveAnimeIdFromNews < ActiveRecord::Migration[7.2]
  def change
    remove_reference :news, :anime,  foreign_key: true
  end
end
