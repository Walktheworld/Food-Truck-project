class AddPageToReviews < ActiveRecord::Migration[6.1]
  def change
    add_reference :reviews, :page, null: false, foreign_key: true
  end
end
