class Api::PostsController < ApplicationController
    skip_before_action :authorized!, only: [:index]
    before_action :find_post, only: [:show, :update, :destroy]
  
      def index
          render json: Post.all
      end
      
      def show 
        render json: serialized_post
      end
  
      def create
        @post = current_user.posts.create!(post_params)
        render json: serialized_post, status: 201
      end
  
      def update 
        @post&.update!(post_params)
        render json: @post, status: :created
      end
  
      def destroy
        if current_user.posts.include?(@post)
            if @post&.destroy
                render json: {message: "Successfully destroyed post!"}
            else
                render json: {error: @post.errors.full_messages.to_sentence}
            end
        else
            no_route
        end
      end
      
        private
  
      def find_post
        @post = Brewery.find(params[:id])
      end
      
      def serialized_post
        @post.to_json(include: :reviews)
      end
  
      def post_params
        params.permit(:name, :website, :phone, :address)
      end
      
end
