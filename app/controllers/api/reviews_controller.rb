class Api::ReviewsController < ApplicationController
    before_action :find_review, only: [:show, :update, :destroy]
    
    def index
      reviews = Review.all
      render json: reviews, include: :breweries
    end
      
    
    def create 
      if params[:brewery_id]
          brewery = Brewery.find(params[:brewery_id])
          @review = @current_user.reviews.create!(brewery: brewery, post: params[:post])
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
      @review = Review.find(params[:brewery_id])
    end

    def serialized_review
        @review.to_json(include: :brewery)
    end

    def review_params
      params.permit(:post, :brewery_id)
    end


    # def show 
    #     render json: serialized_review
    # end

    # def create 
    #     if params[:brewery_id]
    #         brewery = Brewery.find(params[:brewery_id])
    #         @review = brewery.reviews.create!(review_params)
    #         render json: serialized_review, status: 201
    #     end
    # end

    # def update 
    #     if @review&.update(review_params) 
    #         render json: serialized_review
    #     else
    #         render json: {error: @review.errors.full_messages.to_sentence}
    #     end
    # end

    # def destroy 
    #     if @review&.destroy
    #         render json: {message: "Successfully destroyed review!"}
    #     else
    #         render json: {error: @review.errors.full_messages.to_sentence}
    #     end
    # end

    # private

    # def find_review
    #     @review = Review.find(params[:id])
    # end

    # def serialized_review
    #     @review.to_json(include: :brewery)
    # end

    # def review_params
    #     params.require(:review).permit(:post, :brewery_id)
    # end
end
