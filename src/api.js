const URL = "https://pokeapi.co/api/v2/pokemon?limit=1154"

export const searchPokemon = async (search_text) => {
    try {
        const response = await fetch(URL);
    } catch (error) {
        console.log(error);
    }
}