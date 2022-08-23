import './App.css';
import Navbar from './Navbar/Navbar';
import { useState, useEffect } from 'react';
import PokemonThumb from './PokemonThumb/PokemonThumb';

function App() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=30");
  
  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    console.log(data);
    
    setLoadMore(data.next);
    // setAllPokemons(data);

    function createPokemonObject (result) {
      result.forEach( async (pokemon) => {
        const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data2 = await res2.json();
        
        // setAllPokemons([...allPokemons, data]);
        setAllPokemons((currentList) => {
          return [...currentList, data2]
            // ACHO QUE FICA CUSTOSO DEPOIS...
            .sort( (a, b) => {
              if (a.id < b.id) return -1;
              return true;
            });
        });

      });
    }
    createPokemonObject(data.results);

    // NAO SEI PQ NAO FUNCIONA 
    // setAllPokemons(currentList => currentList.sort((a, b) => {
    //   if (a.id < b.id) return -1;
    //   return true;
    // }));
    
  }

  useEffect(() => {
    getAllPokemons();
  }, []);
  
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)){
        // console.log("elemento visivel");
        getAllPokemons();
      }
    });

    intersectionObserver.observe(document.querySelector("#sentinela"));

    return () => intersectionObserver.disconnect();
  });

  return (
    <div className="App">
      <Navbar />
      <div className='pokemons-grid'>
        {allPokemons.map((pokemon) => {
          return <div className='grid-item'>
                  <PokemonThumb 
                    id={pokemon.id} 
                    name={pokemon.name} 
                    image={pokemon['sprites']['other']['official-artwork']['front_default']} 
                    types={pokemon.types}
                  />
                 </div> 
        }
        )}
        <div id='sentinela'></div>
      </div>
    </div>
  );
}

export default App;
