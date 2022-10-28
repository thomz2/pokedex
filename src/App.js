import './App.css';
import Navbar from './Navbar/Navbar';
import { useState, useEffect } from 'react';
import PokemonThumb from './PokemonThumb/PokemonThumb';

function App() {

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=30");
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const getAllPokemons = async () => {

    setLoading(true);

    const res = await fetch(loadMore);
    const data = await res.json();
    console.log(data);
    
    setLoadMore(data.next);
    // setAllPokemons(data);

    function createPokemonObject (result) {
      result.forEach( async (pokemon) => {
        const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data2 = await res2.json();
      
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
    
    await createPokemonObject(data.results);

    setLoading(false);
    
  }

  useEffect(() => {
    if (flag)
      getAllPokemons();
    setFlag((currentFlag) => true);
  }, [page]);
  
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)){
        // console.log("elemento visivel");
        setPage((current_page) => current_page + 1);
      }
    });

    intersectionObserver.observe(document.querySelector("#sentinela"));

    return () => intersectionObserver.disconnect();
  }, []);

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
