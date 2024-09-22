class CreateTechnologies < ActiveRecord::Migration[7.2]
  def change
    create_table :technologies do |t|
      t.string :title
      t.references :genre,  foreign_key: true

      t.timestamps
    end
  end
end
