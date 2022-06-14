class BrewerySerializer < ActiveModel::Serializer

  attributes :id, :name, :website, :phone, :address, :reviews, :user

  
end
