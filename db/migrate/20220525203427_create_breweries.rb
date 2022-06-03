class CreateBreweries < ActiveRecord::Migration[6.1]
  def change
    create_table :breweries do |t|
      t.string :name
      t.string :address 
      t.string :website
      t.bigint :phone
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
