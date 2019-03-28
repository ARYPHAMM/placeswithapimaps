Rails.application.routes.draw do
  get 'pages/home'
  get 'pages/contact'
  get 'page/index'
  get 'page/home'
  resources :places
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'places/changestatus', to: 'places#changestatus'
  root 'pages#home'
end
