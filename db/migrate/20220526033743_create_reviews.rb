class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      # t.references :page, null: false, foreign_key: true
      t.string :comment
      
      t.timestamps
    end
  end
end
