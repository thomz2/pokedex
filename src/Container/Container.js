import React, { useEffect, useState } from 'react';
import './Container.css';

function Container ({ id }) {
    
    const getPokemon = async(id) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        setPokemon(await res.json());
    }
                
    const [pokemon, setPokemon] = useState({});
    
    useEffect(() => {
        getPokemon(id);
    }, [id]);

    return (
        <div className="container">
            <h1>{pokemon.name}</h1>
            <img alt='pokemon' className='img-pokemon' src={pokemon.sprites.front_default}/>
        </div>
    );
}

export default Container;