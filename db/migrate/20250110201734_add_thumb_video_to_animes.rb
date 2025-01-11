class AddThumbVideoToAnimes < ActiveRecord::Migration[7.2]
  def change
    add_column :animes, :thumb_video, :string
  end
end
