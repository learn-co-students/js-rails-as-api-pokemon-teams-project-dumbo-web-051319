class TrainersController < ApplicationController
  def index
    trainer = Trainer.all
    render json: trainer, only: [:id, :name]
  end

  def show
    trainer = Trainer.find_by(id: params[:id])
    if trainer
      render json: { id: trainer.id, name: trainer.name }
    else
      render json: { message: 'Trainer not found' }
    end
  end

  def pokemons
    trainer = Trainer.find_by(id: params[:id])
    if trainer
      pokemons = trainer.pokemons
      render json: pokemons, only: [:id, :nickname, :species, :trainer_id]
    else
      render json: { message: 'Trainer not found' }
    end
  end
end
