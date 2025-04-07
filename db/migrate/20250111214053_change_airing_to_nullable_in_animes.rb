class ChangeAiringToNullableInAnimes < ActiveRecord::Migration[7.2]
  def change
    change_column_null :animes, :airing, true
  end
end
