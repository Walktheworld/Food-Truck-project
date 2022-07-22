class Api::PagesController < ApplicationController
    skip_before_action :authorized!, only: [:index]
    before_action :find_page, only: [:show, :update, :destroy]
  
      def index
          render json: Page.all
      end
      
      def show 
        render json: @page
      end
  
      def create
        @page = current_user.pages.create!(page_params)
        render json: @page, status: 201
      end
  
      def update 
        @page&.update!(page_params)
        render json: @page, status: :created
      end
  
      def destroy
        if current_user.pages.include?(@page)
            if @page&.destroy
                render json: {message: "Successfully destroyed page!"}
            else
                render json: {error: @page.errors.full_messages.to_sentence}
            end
        else
            no_route
        end
      end
      
        private
  
      def find_page
        @page = Page.find(params[:id])
      end
  
      def page_params
        params.permit(:name, :website, :phone, :address)
      end
      
end
