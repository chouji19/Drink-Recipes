import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const RecipesContext = createContext();

const RecipesProvider = (props) => {

    const [recipes, setRecipes] = useState([]);
    const [search, saveSearch] = useState({
        category: '',
        name: ''
    });
    
    const [isSearch, setIsSearch] = useState(false)

    const {name, category} = search;

    useEffect(() => {
        const getRecipes = async () => {
            if(isSearch)
            {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}&i=${name}`;
                const result = await axios.get(url);
                setRecipes(result.data.drinks);
            }
            
        }
        getRecipes();
    }, [search]);

    return (
        <RecipesContext.Provider
            value={{
                recipes,
                saveSearch,
                setIsSearch
            }}
        >
            {props.children}
        </RecipesContext.Provider>
    );
}

export default RecipesProvider;