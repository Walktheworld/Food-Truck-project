class PageSerializer < ActiveModel::Serializer
  attributes :id, :name, :website, :phone, :address, :reviews, :user, :reviewers
  has_many :posts

  def reviewers
    self.object.reviewers.uniq
  end

end
