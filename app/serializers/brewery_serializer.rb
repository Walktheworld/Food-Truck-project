class BrewerySerializer < ActiveModel::Serializer
  # include JSONAPI::Serializer

  attributes :id, :name, :website, :phone, :address, :reviews, :user

  # attribute :reviews do |object|
  #   ReviewSerializer.new(object.reviews)
  # end
  
end
