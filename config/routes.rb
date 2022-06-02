Rails.application.routes.draw do
  # scope :api do
  #   scope :v1 do

  #     resources :users, only: [:update, :destroy]
  #     post "/signup", to: "users#create" 
  #     get "/me", to: "users#show"
  #     post "/login", to: "sessions#create"
  #     delete "/logout", to: "sessions#destroy"
      
  #     # get "/reviews", to: "reviews#index"
  #     resources :reviews, only: [:index]
  #     # "/breweries/:id/reviews"
  #     resources :breweries do
  #       # resources :reviews, only: [:index, :create]
  #       resources :reviews, shallow: true
  #     end
  #   end
  resources :breweries
  resources :reviews

  namespace :api do
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end
  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
