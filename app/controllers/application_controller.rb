class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :no_route
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  before_action :authorized!
  wrap_parameters format: [] 

  private

  def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def authorized!
      no_route unless current_user
  end

  def no_route
      render json: {error: "Not authorized"}, status: :unauthorized unless session.include?(:user_id)
  end

end
