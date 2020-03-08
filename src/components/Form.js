import React, {useContext, useState} from 'react';
import { CategoriesContext } from '../context/CategoriesContext'
import { RecipesContext } from '../context/RecipesContext'

const Form = () => {

    const [search, setSearch] = useState({
        name: '',
        category: ''
    })

    const {categories} = useContext(CategoriesContext)
    const { saveSearch, setIsSearch } = useContext(RecipesContext);

    const getDataRecipe = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }
    
    return ( 
        <form
            className="col-12"
            onSubmit={ e => {
                e.preventDefault();
                saveSearch(search);
                setIsSearch(true);
            }}
        >
            <fieldset className="text-center">
                <legend>Look for drinks by category or ingredient</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="name"
                        className="form-control"
                        type="text"
                        placeholder="Find drink by ingredient"
                        onChange={getDataRecipe}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        name="category"
                        className="form-control"
                        onChange={getDataRecipe}
                    >
                        <option value="">--Selection---</option>
                        {categories.map(cat => (
                            <option 
                                value={cat.strCategory}
                                key={cat.strCategory}
                            >{cat.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <button
                        type="submit"
                        className="btn btn-block btn-primary"
                    >
                    Search</button>
                </div>
            </div>
        </form>

     );
}
 
export default Form;