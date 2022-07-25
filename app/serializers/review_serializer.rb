class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :created_at, :review_by
  belongs_to :page

  def review_by
    "#{self.object.reviewer.username}"
  end
end
