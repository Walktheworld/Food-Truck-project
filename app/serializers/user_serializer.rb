class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :image_url, :bio
  has_many :breweries
end
