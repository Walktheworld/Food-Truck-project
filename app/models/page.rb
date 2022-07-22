class Page < ApplicationRecord
    belongs_to :user
    has_many :reviews, dependent: :destroy
    has_many :reviewers, through: :reviews, source: :reviewer
    has_many :posts, dependent: :destroy
    
    def newest_post
        self.posts.order("created_at desc").limit(1)
    end
end
