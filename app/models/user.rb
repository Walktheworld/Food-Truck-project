class User < ApplicationRecord

  has_many :breweries,  dependent: :destroy

  has_many :reviews 

  has_many :reviewed_breweries, through: :reviews, source: :brewery
  
  has_secure_password

  validates :username, presence: true, uniqueness: true
end
