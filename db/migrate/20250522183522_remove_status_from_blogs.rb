class RemoveStatusFromBlogs < ActiveRecord::Migration[7.2]
  def change
    remove_column :blogs, :status
  end
end
