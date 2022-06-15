class BrewerySerializer < ActiveModel::Serializer

  attributes :id, :name, :website, :phone, :address, :reviews, :user, :reviewers

  def reviewers
    self.object.reviewers.uniq
  end
end
