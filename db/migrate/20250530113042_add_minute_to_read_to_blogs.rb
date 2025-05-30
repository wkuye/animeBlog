class AddMinuteToReadToBlogs < ActiveRecord::Migration[7.2]
  def change
    add_column :blogs, :read, :string
  end
end
