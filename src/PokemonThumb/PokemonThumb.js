import React, { useEffect, useState } from 'react';
import './PokemonThumb.css';

const PokemonThumb = ({ id, name, image, types }) => {

    const [classes, setClasses] = useState([]);
    const [typeNames, setTypeNames] = useState([]);
  
    useEffect(() => {
        types.forEach(element => {
            setClasses(currentList => [...currentList, "type-" + element.type.name]);
            setTypeNames(currentList => [...currentList, element.type.name]);
        });
        console.log(classes);
    }, []);
  
    return (
        <div className={'type-background ' + classes[0] + '-background'}>
            <img className='poke-img' src={image} alt={name} />
            <div className='thumb-container'>
                <div>
                    <p>#{id} - {name}</p>
                </div>
                <div className='types'>
                    <div className={"type " + classes[0]}>
                        {typeNames[0]}                     
                    </div>
                    {classes.length == 2 && <div className={"type " + classes[1]}>                      
                        {typeNames[1]}                        
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default PokemonThumb;