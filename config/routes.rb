Rails.application.routes.draw do
  resources :comments
  devise_for :users, path: "", path_names: {sign_in: "login", sign_out: "logout", sign_up:"register"} # rubocop:disable Layout/SpaceAfterColon

  resources :genres, param: :slug, except:  [ :show ] 
      get "genres/:slug", to: "genres#show", as: "genre_show"

  get "contact", to: "pages#contact"
  post "contact_dev", to: "pages#contact_dev"
  get 'profile/:slug', to: 'pages#profile' ,as:'profile'
  get "home", to: "pages#home"
  get "/load_more_anime", to: "pages#load_more_anime"
  get "/show_more_news", to: "pages#show_more_news"
  delete '/profile/:id/delete_collection', to: 'pages#destroy', as: :delete_collection
  post "profile/:slug/add_collection", to: "pages#create_collection", as: :create_collection
  get "search", to: "search#index"



patch '/profile/:slug/update_header', to: 'pages#update_header', as: :update_header


resources :news, param: :slug
get "news/:id", to: "news#show"

resources :animes, param: :slug
get "/load_more_anime_overview", to: "animes#load_more_anime"
post "/animes/:slug/add_collection/:collection_id",
     to:   "animes#add_collection",
     as:   "add_collection"
resources :blogs, param: :slug
get "/blogs/:slug", to: "blogs#show"

resources :animes, only: [ :show ], param: :slug do
  resources :reviews, only: [ :create ]
end




resources :genres, only: [  :create], param: :slug do
  resources :anime_genres, only: [ :create]
end

resources :blogs, param: :slug do
  resources :comments, only: [:create]
end



 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  root to: "pages#home"
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  mount ActionCable.server => '/cable'
  # Defines the root path route ("/")
  # root "posts#index"
end
