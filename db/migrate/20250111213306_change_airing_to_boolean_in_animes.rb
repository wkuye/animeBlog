class ChangeAiringToBooleanInAnimes < ActiveRecord::Migration[7.2]
  def change
    change_column :animes, :airing, :boolean, default: false, null: false
  end
end
