class BrewerySerializer < ActiveModel::Serializer
  # include JSONAPI::Serializer

  attributes :id, :name, :website, :phone, :address, :reviews, :user

  
end
