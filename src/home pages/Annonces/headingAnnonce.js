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


function HeadingAnnonce() {
    const classes = useStyles()

    useEffect(() => {
      Util()
    })
    

    return (
        <div className={classes.root}>
            <Button color="primary" style={{marginLeft : "1120px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/add-annonce"><span><i className="bi bi-megaphone-fill" style={{paddingRight : "15px"}}></i></span>  Créer Une Annonce </Button>
        </div>
    )
}

export default HeadingAnnonce
