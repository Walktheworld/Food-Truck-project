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
Page.delete_all

joe = User.create( username:"JoeB123", password:"12341234", email:"email@email.com")

roll_up= Page.create(name: "Roll Up Food Truck", address: "123 street", website: "website.com", phone:"1231231234", user_id:joe.id)
r1 = Review.create(comment: "WOW", page_id:roll_up.id, user_id:joe.id)
post1 = Post.create(content: "Come join us from 4pm-8pm", location:"Denver, CO", date:"7/1/2022", page_id:roll_up.id, user_id:joe.id)



puts "✅ Done seeding!"