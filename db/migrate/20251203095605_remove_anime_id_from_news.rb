class RemoveAnimeIdFromNews < ActiveRecord::Migration[7.2]
  def change
    if foreign_key_exists?(:news, :animes)
      remove_reference :news, :anime, foreign_key: true
    else
      remove_reference :news, :anime
    end
  end
end
