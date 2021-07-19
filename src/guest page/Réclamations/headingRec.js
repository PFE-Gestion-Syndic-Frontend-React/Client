import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GuestVerify from '../../utils/guestVerify';
import axios from 'axios';

axios.interceptors.request.use(
  config => {
      config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
      return config
  },
  err => {
      return Promise.reject(err)
  }
)

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


function HeadingRec() {
    const classes = useStyles()

    useEffect(() => {
      GuestVerify()
    })
    return (
        <div className={classes.root}>
            <Button color="primary" style={{marginLeft : "800px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/mes-réclamations"><span><i className="bi bi-megaphone-fill" style={{paddingRight : "15px"}}></i></span>  Mes Réclamations </Button>
            <Button color="primary" style={{marginLeft : "50px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/add-réclamation"><span><i className="bi bi-megaphone-fill" style={{paddingRight : "15px"}}></i></span>  Créer Une Réclamation </Button>
        </div>
    )
}

export default HeadingRec
