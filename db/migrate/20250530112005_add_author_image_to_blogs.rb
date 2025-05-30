class AddAuthorImageToBlogs < ActiveRecord::Migration[7.2]
  def change
    add_column :blogs, :image, :string
  end
end
