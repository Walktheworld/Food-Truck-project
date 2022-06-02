class ReviewSerializer < ActiveModel::Serializer
  # include JSONAPI::Serializer
  attributes :post, :created_at
  belongs_to :brewery, serializer: BrewerySerializer

end
