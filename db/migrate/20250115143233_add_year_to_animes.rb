class AddYearToAnimes < ActiveRecord::Migration[7.2]
  def change
    add_column :animes, :year, :integer
  end
end
