import React, { useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';


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
    const History = useHistory()
    const classes = useStyles();

    useEffect(()=> {
      axios.get("/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve){
                if(resolve.data.role === "Administrateur"){
                    console.log("Yes Authenticated")
                }
                else if(resolve.data.role !== "Administrateur"){
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }
                else if(resolve.data.msg === "Incorrect token !"){
                    console.log("Incorrect Token")
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }
                else if(resolve.data.auth === false){
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }
            }
            else{
                localStorage.clear()
                History.push('/')
                window.location.reload()
            }
        })
        .catch(() => {})
    }, [History])

    return (
        <div className={classes.root}>
            <Button variant="text"  color="primary" style={{marginLeft : "1143px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/add-dépense"><span><i className="bi bi-plus-circle-fill" style={{paddingRight : "15px"}}></i></span>  Enregistrer Une Dépense </Button>
        </div>
    )
}

export default HeadingDepense
