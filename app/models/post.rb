class Post < ApplicationRecord
    belongs_to :page
    belongs_to :creator, class_name: "User", foreign_key: :user_id

end
