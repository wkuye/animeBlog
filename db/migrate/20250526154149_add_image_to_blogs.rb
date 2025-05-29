class AddImageToBlogs < ActiveRecord::Migration[7.2]
  def change
    add_column :blogs, :blog_image, :text
  end
end
