class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :email
  has_many :pages
  has_many :posts
  has_many :reviews
end
