class AddSlugToAnime < ActiveRecord::Migration[7.2]
  def change
    add_column :animes, :slug, :string
  end
end
