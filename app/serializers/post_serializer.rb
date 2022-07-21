class PostSerializer < ActiveModel::Serializer
  attributes :id, :location, :content, :media_url, :date 
  belongs_to :page, serializer: PageSerializer

end
