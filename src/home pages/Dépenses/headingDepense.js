import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
  }));

function HeadingDepense() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained"  style={{marginLeft : "900px", width : "200px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/filter-dépense">Filtrer Les Dépenses</Button>
            <Button variant="text"  color="primary" style={{marginLeft : "50px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/add-dépense"><span><i className="bi bi-plus-circle-fill" style={{paddingRight : "15px"}}></i></span>  Enregistrer Une Dépense </Button>
        </div>
    )
}

export default HeadingDepense
