class PostSerializer < ActiveModel::Serializer
  attributes :id, :location, :content, :date 
  belongs_to :page

end
