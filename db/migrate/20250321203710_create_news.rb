class CreateNews < ActiveRecord::Migration[7.2]
  def change
    create_table :news do |t|
      t.string :image
      t.string :description

      t.timestamps
    end
  end
end
