class ChangeAiringDefaultInAnimes < ActiveRecord::Migration[7.2]
  def change
    def change
      change_column_default :animes, :airing, from: nil, to: false
    end
  end
end
