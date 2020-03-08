import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// Create context
export const CategoriesContext = createContext();

// Provider es donde se encuentran las funciones y el state

const CategoriesProvider = (props) => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const cats = await axios.get(url) 
            //console.log(cats);
            
            setCategories(cats.data.drinks)
        }
        getCategories();
    }, [])

    return (
        <CategoriesContext.Provider
            value={{
                categories
            }}
        >
            {props.children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesProvider;