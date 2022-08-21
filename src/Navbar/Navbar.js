import React from 'react';
import "./Navbar.css";
import pokedex from "./pokedex.png"

export default function Navbar() {
  return (
    <header className='navbar'>
        <div>
            {/* <img className='img-pokedex' src={pokedex} alt='pokedex' /> */}
            <p>Pokedéx!</p>
        </div>
    </header>
  )
}
