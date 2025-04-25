class Addratingtoanimes < ActiveRecord::Migration[7.2]
  def change
    add_column :animes, :rating, :float
  end
end
