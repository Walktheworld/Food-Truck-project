class ReviewSerializer < ActiveModel::Serializer
  attributes :post, :created_at
  belongs_to :brewery, serializer: BrewerySerializer

end
