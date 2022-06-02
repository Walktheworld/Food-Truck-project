class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.references :brewery, null: false, foreign_key: true
      t.string :post
      
      t.timestamps
    end
  end
end
