class RemoveTopicIdFromBlogs < ActiveRecord::Migration[7.2]
  def change
    remove_column :blogs, :topic_id
  end
end
