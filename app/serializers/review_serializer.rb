class ReviewSerializer < ActiveModel::Serializer
  attributes :comment, :created_at, :review_by
  # belongs_to :page
  # belongs_to :reviewers

  def review_by
    "#{self.object.reviewer.username}"
  end
end
