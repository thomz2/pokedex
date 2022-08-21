import React, { useEffect, useState } from 'react';
import './MudaPokemon.css';

function MudaPokemon () {
    
    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState({});
    const [id, setId] = useState(1);

    const getPokemon = async(id) => {
        setLoading(true);
        
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        setPokemon(await res.json());
        
        setLoading(false);
    }

    function handleId (id) {
        if (id === 0) return 891;
        if (id === 891) return 0;
        return id;
    }

    useEffect(() => {
        getPokemon(1);
    }, []);
    
    // 1: funcao a ser executada. 2: quando ser executada.
    // pode retornar uma funcao que executa quando o componente for desmontado:
    // return () => funcao
    useEffect(() => {
        getPokemon(id);
    }, [id]);

    // if (loading) {
    //     return <p>Loading...</p>
    // }

    return (
        <div className="container">
            <h1>{pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h1>
            <div className='botoes'>
                <button onClick={() => setId(handleId(id - 1))}> {'<'} </button>
                <button onClick={() => setId(handleId(id + 1))}> {'>'} </button>
            </div>
            <img alt='pokemon' className='img-pokemon' src={pokemon.sprites.other.home.front_default}/>
        </div>
    );
}

export default MudaPokemon;