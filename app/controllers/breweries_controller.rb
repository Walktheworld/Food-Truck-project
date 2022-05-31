class BreweriesController < ApplicationController
    def index
        render json: Brewery.all
      end
    
      def create
        brewery = @current_user.breweries.create!(brewery_params)
        render json: brewery, status: :created
      end
    
      private
    
      def brewery_params
        params.permit(:name, :website, :phone, :address, :review)
      end
    
end
