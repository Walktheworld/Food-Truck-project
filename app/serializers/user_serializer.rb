class UserSerializer < ActiveModel::Serializer
  # include JSONAPI::Serializer

  attributes :id, :username, :image_url, :bio
  has_many :breweries
end
