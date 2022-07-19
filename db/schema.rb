# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_07_18_203430) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pages", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "website"
    t.bigint "phone"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "bio"
    t.index ["user_id"], name: "index_pages_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "page_id", null: false
    t.string "location"
    t.text "content"
    t.string "media_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "date"
    t.bigint "user_id", null: false
    t.index ["page_id"], name: "index_posts_on_page_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "comment"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.bigint "page_id", null: false
    t.index ["page_id"], name: "index_reviews_on_page_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "pages", "users"
  add_foreign_key "posts", "pages"
  add_foreign_key "posts", "users"
  add_foreign_key "reviews", "pages"
  add_foreign_key "reviews", "users"
end
