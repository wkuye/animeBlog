class RemoveBlogImageFromBlogs < ActiveRecord::Migration[7.2]
  def change
    remove_column :blogs, :blog_image
  end
end
