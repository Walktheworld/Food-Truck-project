class User < ApplicationRecord
  has_many :pages,  dependent: :destroy
  has_many :reviews 
  has_many :reviewed_pages, through: :reviews, source: :page
  has_many :posts 
  has_secure_password

  validates :username, uniqueness: true, presence: true, length: {in: 4..25}
  validates :email, presence: true, uniqueness: true, format: {with: /\A(?<username>[^@\s]+)@((?<domain_name>[-a-z0-9]+)\.(?<domain>[a-z]{2,}))\z/i}
  validates :password, length: {in: 6..250}

end
