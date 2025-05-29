class AddDescriptionToBlogs < ActiveRecord::Migration[7.2]
  def change
    add_column :blogs, :description, :text
  end
end
