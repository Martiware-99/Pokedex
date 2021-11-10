let numberOfPokemon = 898
let container = document.querySelector('.container')

const getPokemon = async id => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await response.json()
    pokedexEntry(pokemon)
    console.log(pokemon)
}

const fetchPokemons = async () => {
    for (let index = 1; index <= numberOfPokemon; index++) {
        await getPokemon(index)
    }
}

fetchPokemons()

const pokedexEntry = pokemon => {
    let pokeCard = document.createElement('article')
    pokeCard.classList.add('pokeCard', `${pokemon.types[0].type.name}`)
    container.appendChild(pokeCard)

    let innerCard = document.createElement('div')
    innerCard.classList.add('innerCard')
    pokeCard.appendChild(innerCard)

    let pokeSprite = document.createElement('figure')
    pokeSprite.classList.add('pokeSprite')
    pokeSprite.style.backgroundImage = `url(${pokemon.sprites.other["official-artwork"].front_default})`
    innerCard.appendChild(pokeSprite)

    let pokeDescription = document.createElement('section')
    pokeDescription.classList.add('pokeDescription')
    innerCard.appendChild(pokeDescription)

    let pokeName = document.createElement('header')
    pokeName.classList.add('pokeName')
    pokeDescription.appendChild(pokeName)

    let moveSet = document.createElement('div')
    moveSet.classList.add('moveSet')
    pokeDescription.appendChild(moveSet)

    let devolution = document.createElement('p')
    devolution.classList.add('devolution')
    pokeDescription.appendChild(devolution)
    
    let name = document.createElement('p')
    name.classList.add('name')
    name.innerHTML = pokemon.name
    pokeName.appendChild(name)

    let id = document.createElement('p')
    id.classList.add('id')
    id.innerHTML = `#${pokemon.id}`
    pokeName.appendChild(id)

    if (pokemon.moves.length > 1) {
        for (let i = 1; i <= 4 ; i++) {
            let move = document.createElement('p')
            move.classList.add(`move${i}`)
            move.innerHTML = pokemon.moves[Math.floor(Math.random()*pokemon.moves.length)].move.name 
            moveSet.appendChild(move)
        } 
    } else {
        let move = document.createElement('p')
        move.classList.add('move1')
        move.innerHTML = pokemon.moves[0].move.name
        moveSet.appendChild(move)
    }
}
