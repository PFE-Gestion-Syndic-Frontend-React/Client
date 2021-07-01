import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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


function Heading() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Button variant="text"  color="primary" style={{marginLeft : "1120px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/add-compte"><span><i className="bi bi-person-plus" style={{paddingRight : "15px"}}></i></span>  Créer Un Compte </Button>
        </div>
    )
}

export default Heading
