class Api::UsersController < ApplicationController
  skip_before_action :authorized!, only: :create
  
  
  def index
    render json: User.all
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    render json: @current_user
  end

  def profile
    reviewed = @current_user.reviewed_breweries
    render json: reviewed
  end

  private
  def serialized_user
    @user.to_json(include: :pages)
  end

  def user_params
    params.permit(:username, :password, :password_confirmation, :image_url, :email)
  end


end
