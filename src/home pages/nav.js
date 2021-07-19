import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tab, Tabs, Paper, MenuItem, Menu, Button, Avatar } from '@material-ui/core';
import axios from 'axios';
import Util from '../utils/util';

/*axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)*/


const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1600,
    },
  });

function Nav(props) {
    const id = localStorage.getItem('id')
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null)
    const [load, setLoad] = useState('')
    const [Name, setName ]= useState('')
    const [Prenom, setPrenom] = useState('')
    const [photo, setPhoto] = useState('')
    //let token = localStorage.getItem('token')
    const [OK, setOK] = useState(true)

    useEffect(() => {
        //Util()
        if(id !== "" && id !== undefined){
            axios.get(`http://localhost:5001/me/${id}`)
            .then((resolve) => {
                if(resolve.data[0]){
                    setName(resolve.data[0].NomCompte)
                    setPrenom(resolve.data[0].PrenomCompte)
                    setPhoto(resolve.data[0].photo)
                }
            })
            .catch(()=>{})
        }
    }, [id, load, Name, Prenom, photo])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleClick = (e) => {
        setAnchorEl(e.currentTarget + 1);
        setLoad(e.currentTarget + 1);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const History = useHistory()
    const logout = () => {
        setAnchorEl(null)
        localStorage.clear()
        History.push('/')
        window.location.reload()
    }

    if(!localStorage.getItem('token')){
        setOK(false)
        logout()
    }

    return (
        <div>
            {
                OK === true &&
                <Paper square className={classes.root}>
                    <AppBar color="default">
                        <Tabs value={value} onChange={handleChange} variant="fullwidth" indicatorColor="primary" textColor="primary">
                            <Tab label="GSC" component={Link} to="/home" onClick={()=> setLoad("GSC")} />
                            <Tab label="Dépense" component={Link} to="/dépenses" onClick={()=> setLoad("Dépense")} />
                            <Tab label="Cotisation" component={Link} to="/cotisations" onClick={()=> setLoad("Cotisation")} />
                            <Tab label="Annonce" component={Link} to="/annonces" onClick={()=> setLoad("annonce")} />
                            <Tab label="Réclamation" component={Link} to="/réclamations" onClick={()=> setLoad("réclamation")} />
                            <Tab label="Comptes" component={Link} to="/comptes" onClick={()=> setLoad("compte")} />
                            <Tab label="Logement" component={Link} to="/logement" onClick={()=> setLoad("logement") } />
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{photo && <Avatar alt="" src={`profile img/${photo}`} style={{width : "30px", height : "30px"}} />} &nbsp;&nbsp;&nbsp; <strong> { Name && Name } { Prenom && Prenom} </strong></Button>
                            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} style={{top : "0", right : "0"}} >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/settings"> Mon Compte</MenuItem>
                                <MenuItem onClick={logout} >Logout</MenuItem>
                            </Menu>
                        </Tabs>
                    </AppBar>
                </Paper>  
            }
        </div>
    )
}

export default Nav
