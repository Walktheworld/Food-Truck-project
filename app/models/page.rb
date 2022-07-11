class Page < ApplicationRecord
    belongs_to :creator, class_name: "User"
    has_many :clients, through: :reviews, source: :user
    has_many :reviews

end
