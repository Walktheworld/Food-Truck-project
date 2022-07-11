class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :image_url, :email
  has_many :breweries
end
