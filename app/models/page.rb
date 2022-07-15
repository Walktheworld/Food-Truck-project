class Page < ApplicationRecord
    belongs_to :user
    # belongs_to :creator, class_name: "User"
    has_many :clients, through: :reviews, source: :user
    has_many :reviews
    has_many :reviewers, through: :reviews, source: :reviewer

end
