import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));


function HeadingLogement() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Button variant="text"  color="primary" style={{marginLeft : "1120px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/add-logement"><span><i class="bi bi-house-fill" style={{paddingRight : "15px"}}></i></span>  Enregistrer Un Logement </Button>
        </div>
    )
}

export default HeadingLogement
