import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Recipe = ({recipe}) => {
    
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
                    <li key={`data.idDrink${i}`}>{data[`strIngredient${i}`] } {data[`strMeasure${i}`] }</li>
                )
            }       
        }
        return ingredients;
    }

    const closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{strDrink}</h2>
                <img className="card-img-top" src={strDrinkThumb} alt={`${strDrink}`} />
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
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                        onClose={() => {
                            setIdRecipe(null);
                            setRecipe({});
                            handleClose();
                        }
                        }
                        title={
                            <div>
                                ABC 
                                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' style={closeImg}/>
                            </div>
                        }
                    >
                        <Fade in={open}>
                            <div className={`${classes.paper} scrollDiv`}>
                                <h2 id="transition-modal-title">{dataRecipe.strDrink}</h2>
                                <h3 className="mt-4">Instructions: </h3>
                                <div id="transition-modal-description">
                                    {dataRecipe.strInstructions}
                                </div>
                                <img className="my-4 img-thumbnail" src={dataRecipe.strDrinkThumb} />
                                <h3>Ingredients/Measures</h3>
                                <ul>
                                    {showIngredients(dataRecipe)}
                                </ul>
                                <button 
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                       setIdRecipe(null);
                                        setRecipe({});
                                        handleClose();
                                    }}
                                >Back to Recipes</button>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Recipe;