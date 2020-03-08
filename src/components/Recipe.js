import React, {useContext, useState} from 'react';
import { ModalContext } from '../context/ModalContext'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Recipe = ({recipe}) => {
    
    const [modalStyle] = useState(getModalStyle)
    const [open, setOpen] = useState(false)

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const {setIdRecipe, dataRecipe, setRecipe} = useContext(ModalContext);
    const {strDrink, strDrinkThumb, idDrink} = recipe;

    //show ingredients

    const showIngredients = data => {
        let ingredients = [];
        for (let i = 0; i < 16; i++) {
            if(data[`strIngredient${i}`]) {
                ingredients.push(
                    <li>{data[`strIngredient${i}`] } {data[`strMeasure${i}`] }</li>
                )
            }       
        }
        return ingredients;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{strDrink}</h2>
                <img className="card-img-top" src={strDrinkThumb} alt={`Image of ${strDrink}`} />
                <div className="card-body">
                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            setIdRecipe(idDrink);
                            handleOpen();
                        }}
                    >Show Recipe</button>
                    <Modal
                        open={open}
                        onClose={() => {
                            setIdRecipe(null);
                            setRecipe({});
                            handleClose();
                        }
                        }
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{dataRecipe.strDrink}</h2>
                            <h3 className="mt-4">Instructions: </h3>
                            <p>
                                {dataRecipe.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={dataRecipe.strDrinkThumb} />
                            <h3>Ingredients/Measures</h3>
                            <ul>
                                {showIngredients(dataRecipe)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Recipe;