class BrewerySerializer < ActiveModel::Serializer

  attributes :id, :name, :website, :phone, :address
  has_one :user
end
