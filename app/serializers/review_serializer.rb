class ReviewSerializer < ActiveModel::Serializer
  attributes :comment, :created_at
  belongs_to :page, serializer: PageSerializer

end
