class Brewery < ApplicationRecord
    belongs_to :user

    has_many :reviews, dependent: :destroy

    has_many :reviewers, through: :reviews, source: :reviewer

    validates :name, presence: true

end
