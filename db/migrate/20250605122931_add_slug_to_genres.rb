class AddSlugToGenres < ActiveRecord::Migration[7.2]
  def change
    add_column :genres, :slug, :string
  end
end
