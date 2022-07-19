class Api::PostsController < ApplicationController
    # skip_before_action :authorized!, only: [:index]
    before_action :find_post, only: [:show, :update, :destroy]
        
    def index
      posts = Post.all
      render json: posts, include: :pages
    end

    def create 
      if params[:page_id]
          page = Page.find(params[:page_id])
          @post = @current_user.posts.create!(page: page, content: params[:content], location: params[:location], date: params[:date])
          render json: serialized_post, status: 201
      end
    end
      
    def destroy 
      if @post&.destroy
          render json: {message: "Successfully destroyed post!"}
      else
          render json: {error: @post.errors.full_messages.to_sentence}
      end
    end

      private
    
    def find_post
      @post = Post.find(params[:page_id])
    end

    def serialized_post
        @post.to_json(include: :page)
    end

    def post_params
      params.permit(:content, :date, :location, :page_id )
    end
      
end
