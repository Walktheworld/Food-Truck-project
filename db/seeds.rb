# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "🌱 "
Review.delete_all
User.delete_all
Brewery.delete_all

joe = User.create( username:"joe", password:"12341234")

left_hand= Brewery.create(name: "Left Hand Brewery", address: "123 street", website: "website.com", phone:"1231231234", user_id:joe.id)
r1 = Review.create(post: "WOW", brewery_id:left_hand.id, user_id:joe.id)



puts "✅ Done seeding!"