class AddSlugToNews < ActiveRecord::Migration[7.2]
  def change
    add_column :news, :slug, :string
  end
end
