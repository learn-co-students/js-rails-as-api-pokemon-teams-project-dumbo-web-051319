Rails.application.routes.draw do
  resources :pokemons
  resources :trainers

  get "trainers/:id/pokemons", to: "trainers#pokemons", as: "trainer_pokemons"
  # get "pokemon/random", to: "pokemons#random", as: "pokemon_random"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
