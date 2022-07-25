class Api::ReviewsController < ApplicationController

    before_action :find_review, only: [:show, :update, :destroy]
    
    def index
      params[:page_id]
      page = Page.find(params[:page_id])
      render json: page.reviews
    end
    
    def show 
      render json: @review
    end
    
    def create 
      params[:page_id]
        page = Page.find(params[:page_id])
        @review = @current_user.reviews.create!(page: page, comment: params[:comment])
        render json: @review, status: 201
    end

    def destroy 
      if @review&.destroy
          render json: {message: "Successfully destroyed review!"}
      else
          render json: {error: @review.errors.full_messages.to_sentence}
      end
    end

      private
    
    def find_review
      @review = Review.find(params[:id])
    end

    def review_params
      params.permit(:comment, :page_id, :user_id)
    end


end
