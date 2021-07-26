import React, { useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));


function HeadingLogement() {
    const History = useHistory()
    const classes = useStyles()
    useEffect(() => {

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
            <Button variant="text"  color="primary" style={{marginLeft : "1140px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} component={Link} to="/add-logement"><span><i className="bi bi-house-fill" style={{paddingRight : "15px"}}></i></span>  Enregistrer Un Logement </Button>
        </div>
    )
}

export default HeadingLogement
