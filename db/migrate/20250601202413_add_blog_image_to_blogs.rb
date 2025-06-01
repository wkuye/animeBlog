class AddBlogImageToBlogs < ActiveRecord::Migration[7.2]
  def change
    add_column :blogs, :blog_image, :string
  end
end
