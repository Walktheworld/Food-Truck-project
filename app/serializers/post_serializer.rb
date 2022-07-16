class PostSerializer < ActiveModel::Serializer
  attributes :location, :content, :media_url, :date
  belongs_to :page, serializer: PageSerializer

end
