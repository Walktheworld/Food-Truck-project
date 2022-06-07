class Api::BreweriesController < ApplicationController
  skip_before_action :authorized!, only: [:index]
  before_action :find_brewery, only: [:show, :update, :destroy]

    def index
        render json: Brewery.all
    end
    
    def show 
      render json: serialized_brewery
    end

    def create
      @brewery = current_user.breweries.create!(brewery_params)
      render json: serialized_brewery, status: 201
    end

    def update 
      @brewery&.update!(brewery_params)
      render json: @brewery, status: :created
    end

    def destroy
      if current_user.breweries.include?(@brewery)
          if @brewery&.destroy
              render json: {message: "Successfully destroyed brewery!"}
          else
              render json: {error: @brewery.errors.full_messages.to_sentence}
          end
      else
          no_route
      end
    end
    
      private

    def find_brewery
      @brewery = Brewery.find(params[:id])
    end
    
    def serialized_brewery
      @brewery.to_json(include: :reviews)
    end

    def brewery_params
      params.permit(:name, :website, :phone, :address)
    end
    
end
