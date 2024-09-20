class RemoveForeignKeyAndTopicsIdFromBlogs < ActiveRecord::Migration[7.2]
  def change
    # Remove the foreign key constraint first
    remove_foreign_key :blogs, column: :topics_id

    # Remove the topics_id column
    remove_column :blogs, :topics_id, :integer
  end
end
