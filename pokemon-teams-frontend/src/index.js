const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")


document.addEventListener("DOMContentLoaded", function(){
  fetchTrainer();
  main.addEventListener("click", addevent)
})

// add event
function addevent(){
  if (event.target.className == "add-btn") {
    addRandomToTrainer(event.target.dataset.trainerid)
  }
  else if (event.target.className == "release") {
    console.log(event.target.dataset.pokemonid);
    releasePokemon(event.target.dataset.pokemonid);
  }
}

// fetch
function fetchTrainer(){
  fetch(TRAINERS_URL)
    .then(rsp => rsp.json())
    .then(trainers => displayTrainers(trainers))
}

function fetchPokemon(trainer_id){
  return fetch(`${BASE_URL}/trainers/${trainer_id}/pokemons`)
    .then(rsp => rsp.json())
}

function fetchRandomPokemon(id){
  let trainerInfo = {
    trainer_id: id
  }
  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(trainerInfo)
  }
  return fetch(`${BASE_URL}/pokemons`, config)
    .then(rsp => rsp.json())
}

function releasePokemon(id){
  let config = {
    method: "DELETE"
  }
  fetch(`${BASE_URL}/pokemons/${id}`, config)
  removeFromList(id)
}

// logic
function displayTrainers(trainers){
  trainers.forEach(function(trainer){
    let div = document.createElement("div")
    div.className = "card"
    div.id = "trainer-" + trainer.id
    div.innerHTML = `
      <p>${trainer.name}</p>
      <button class="add-btn" data-trainerid=${trainer.id}>Add Pokemon</button>
      <ul>
      </ul>
    `
    main.append(div)
    addPokemon(trainer.id, div)
  })
}

function addPokemon(trainer_id, div){
  fetchPokemon(trainer_id).then(function(pokemons){
    pokemons.forEach(function(pokemon){
      let li = document.createElement("li")
      li.innerHTML = `
        ${pokemon.nickname} (${pokemon.species}) <button class="release" id="pokemon-${pokemon.id}" data-pokemonid="${pokemon.id}">Release</button>
      `
      div.lastElementChild.append(li)
    })
  })
}

function addRandomToTrainer(id){
  const div = document.querySelector(`#trainer-${id}`)
  // debugger
  if (div.querySelectorAll("li").length >= 6) {
    return
  }
  fetchRandomPokemon(id).then(function(pokemon){
    let li = document.createElement("li")
    li.innerHTML = `
      ${pokemon.nickname} (${pokemon.species}) <button class="release" id="pokemon-${pokemon.id}" data-pokemonid="${pokemon.id}">Release</button>
    `
    div.lastElementChild.append(li)
  })
}

function removeFromList(id){
  // debugger;
  document.querySelector(`#pokemon-${id}`).parentNode.remove()
}
