import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import pokedex from "./pokedex.png"

export default function Navbar() {

  const pokemons = ["pikachu", "charmander", "dragonite", "arceus", "chikorita", "muk", "gengar", "scyter", "magikarp", "snorlax"]
  const [random, setRandom] = useState(-1);

  useEffect(() => {
    setRandom(Math.floor(Math.random() * (pokemons.length)));
  }, []);

  return (
    <header className='navbar'>
        <div>
            {/* <img className='img-pokedex' src={pokedex} alt='pokedex' /> */}
            <p>Pokedéx!</p>
            <input type="text" class="css-input" placeholder={pokemons[random]}/>
        </div>
    </header>
  )
}
