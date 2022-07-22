class Page < ApplicationRecord
    belongs_to :user
    # belongs_to :creator, class_name: "User"
    # has_many :clients, through: :reviews, source: :user
    has_many :reviews, dependent: :destroy
    has_many :reviewers, through: :reviews, source: :reviewer
    has_many :posts, dependent: :destroy

    def newest_post
        self.posts.order("created_at desc").limit(1)
    end
end
