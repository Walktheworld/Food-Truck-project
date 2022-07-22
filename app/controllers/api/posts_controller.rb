class Api::PostsController < ApplicationController
    skip_before_action :authorized!, only: [:index]
    before_action :find_post, only: [:show, :update, :destroy]
        
    def index
      posts = Post.all
      render json: posts, include: :pages
    end

    def create 
      params[:page_id]
        page = Page.find(params[:page_id])
        @post = current_user.posts.create!(page: page, content: params[:content], location: params[:location], date: params[:date])
        render json: @post, status: 201
    end

    def update 
      @post&.update!(post_params)
      render json: @post, status: :created
    end
      
    def destroy
      if @current_user.posts.include?(@post)
          if @post&.destroy
              render json: {message: "Successfully destroyed post!"}
          else
              render json: {error: @posts.errors.full_messages.to_sentence}
          end
      else
          no_route
      end
    end

      private
    
    def find_post
      @post = Post.find(params[:page_id])
    end

    def post_params
      params.permit(:content, :date, :location, :page_id )
    end
      
end
