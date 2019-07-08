const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const container = document.querySelector('main')

fetchTrainersIndex();

//-------------------------events -----------------

container.addEventListener('click', handleClick)

function handleClick(e) {
  if (e.target.className === "add-pokemon") {
    const trainerId = e.target.dataset.trainerId
    postPokemon(trainerId, e)
  } else if (e.target.className === "release") {
    const pokemonId = e.target.dataset.pokemonId
    deletePokemon(pokemonId, e)
  }
}

//-------------------------- fetches ---------------
// document.addEventListener('DOMContentLoaded', function() {

  function fetchTrainersIndex() {

    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainersIndex)
  }

  function postPokemon(trainerId, e) {
    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        trainer_id: trainerId
      })
    })
    .then(res => res.json())
    .then(data => newPokemon(data, e))
  }

  function deletePokemon(pokemonId, e) {
    const li = e.target.parentElement
    fetch(POKEMONS_URL + `/${pokemonId}`, {
      method: 'DELETE'
    })
    .then(function() {
      li.remove()
    })
  }



//---------------------- domslaps -----------------------


function newPokemon(data, e) {
  let ul = e.target.nextElementSibling
  ul.innerHTML += `
  <li>${data.nickname} (${data.species})
  <button class="release" data-pokemon-id=${data.id}>Release</button>
  </li>
  `
}

function trainersIndex(data) {
  for (const item of data) {
    let pokemonList = '<ul>'
    for (const pokemon of item.pokemons) {
      pokemonList += `
        <li>${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
        </li>
      `
    }
    pokemonList += '</ul>'

    container.innerHTML += `
    <div class="card" data-id=${item.id}><p>${item.name}</p>
    <button class="add-pokemon" data-trainer-id=${item.id}>Add Pokemon</button>
    ${pokemonList}
    </div>
    `
  }

}

// });
