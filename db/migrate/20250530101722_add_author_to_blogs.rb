class AddAuthorToBlogs < ActiveRecord::Migration[7.2]
  def change
    add_column :blogs, :author, :string
  end
end
