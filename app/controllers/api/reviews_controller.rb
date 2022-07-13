class Api::ReviewsController < ApplicationController
    before_action :find_review, only: [:show, :update, :destroy]
    
    def index
      reviews = Review.all
      render json: reviews, include: :pages
    end
      
    
    def create 
      if params[:page_id]
          page = Page.find(params[:page_id])
          @review = @current_user.reviews.create!(page: page, comment: params[:comment])
          render json: serialized_review, status: 201
      end
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
      @review = Review.find(params[:page_id])
    end

    def serialized_review
        @review.to_json(include: :page)
    end

    def review_params
      params.permit(:comment, :page_id)
    end


end
