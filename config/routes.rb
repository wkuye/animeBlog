Rails.application.routes.draw do
  #changed the last domain name from genres/log_out to genres/logout , we also did it for the rest, the path being empty removes the prefix 
  devise_for :users, path: "", path_names: {sign_in: "login", sign_out: "logout", sign_up:"register"} # rubocop:disable Layout/SpaceAfterColon

  resources :genres, except:  [ :show ]
  get "genre/:id", to: "genres#show", as: "genre_show"
  get "about", to: "pages#about"
  get "contact", to: "pages#contact"
  get "home", to: "pages#home"
  get "/load_more_anime", to: "pages#load_more_anime"
  get "/show_more_news", to: "pages#show_more_news"

resources :news, param: :slug
get "news/:id", to: "news#show"

   # rubocop:disable Layout/TrailingWhitespace
  # get "home/contact"
  resources :blogs do
    member do
      get :toggle_status
      end
    end

 
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  root to: "pages#home"
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
end
