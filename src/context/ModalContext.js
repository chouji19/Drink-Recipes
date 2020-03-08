import React, {createContext, useEffect, useState, useContext} from 'react';
import axios from 'axios'


export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idRecipe, setIdRecipe] = useState(null);
    const [dataRecipe, setRecipe] = useState({})

    useEffect(() => {
        const getFullRecipe = async () => {
            if(!idRecipe) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
            const result = await axios.get(url);
            setRecipe(result.data.drinks[0]);
            
        }
        getFullRecipe();
    }, [idRecipe])

    return (
        <ModalContext.Provider
            value={{
                setIdRecipe,
                dataRecipe,
                setRecipe
            }}
        >
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;