require 'faker'
class PokemonsController < ApplicationController
  def index
    pokemons = Pokemon.all
    render json: pokemons, only: [:id, :nickname, :species, :trainer_id]
  end

  def create
    # byebug
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    # byebug
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    render json: { id: pokemon.id, nickname: pokemon.nickname, species: pokemon.species, trainer_id: pokemon.trainer_id }
  end

  def show
    pokemon = Pokemon.find_by(id: params[:id])
    if pokemon
      render json: { id: pokemon.id, name: pokemon.nickname, species: pokemon.species, trainer_id: pokemon.trainer_id }
    else
      render json: { message: 'Pokemon not found' }
    end
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.delete
    # byebug
  end
end

private

def pokemon_params(*args)
  params.require(:pokemon).permit(*args)
end
