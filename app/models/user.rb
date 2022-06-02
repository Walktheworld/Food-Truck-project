class User < ApplicationRecord

  has_many :breweries,  dependent: :destroy
  
  has_secure_password

  validates :username, presence: true, uniqueness: true
end
