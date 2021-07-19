import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Util from '../../utils/util';




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

function HeadingCotisasion() {
    const classes = useStyles()

    useEffect(() =>{
      Util()
    })

    return (
        <div className={classes.root}>
            <Button variant="text"  color="primary" style={{marginLeft : "700px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/les-impayés"><span><i className="bi bi-dash-circle-fill" style={{paddingRight : "15px"}}></i></span>  Consulter Les Impayés </Button>
            <Button variant="text"  color="primary" style={{marginLeft : "100px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/add-cotisation"><span><i className="bi bi-plus-circle-fill" style={{paddingRight : "15px"}}></i></span>  Enregistrer Une Cotisation </Button>
        </div>
    )
}

export default HeadingCotisasion
