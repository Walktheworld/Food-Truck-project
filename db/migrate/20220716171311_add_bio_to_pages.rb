class AddBioToPages < ActiveRecord::Migration[6.1]
  def change
    add_column :pages, :bio, :string
  end
end
