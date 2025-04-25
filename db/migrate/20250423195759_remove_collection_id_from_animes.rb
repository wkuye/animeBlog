class RemoveCollectionIdFromAnimes < ActiveRecord::Migration[7.2]
  def change
    # Drop the column (and any index on it)
    remove_reference :animes, :collection, index: true
  end
end
