class RenameThumbVideoToThumbVideoUrlInAnimes < ActiveRecord::Migration[7.2]
  def change
    rename_column :animes, :thumb_video, :thumb_video_url
  end
end
