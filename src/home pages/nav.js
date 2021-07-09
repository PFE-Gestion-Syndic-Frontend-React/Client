import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tab, Tabs, Paper, MenuItem, Menu, Button, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1600,
    },
  });

function Nav(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = useState(null)
    let Name = localStorage.getItem('Name')
    let Prenom = localStorage.getItem('First')
    let photo = localStorage.getItem('photo')
    //let token = localStorage.getItem('token')
    const [OK, setOK] = useState(true)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
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
                    <AppBar color="transparent">
                        <Tabs value={value} onChange={handleChange} variant="fullwidth" indicatorColor="primary" textColor="primary">
                            <Tab label="GSC" component={Link} to="/home" />
                            <Tab label="Dépense" component={Link} to="/dépenses" />
                            <Tab label="Cotisation" component={Link} to="/cotisations" />
                            <Tab label="Annonce" component={Link} to="/annonces" />
                            <Tab label="Réclamation" component={Link} to="/réclamations" />
                            <Tab label="Comptes" component={Link} to="/comptes" />
                            <Tab label="Logement" component={Link} to="/logement" />
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{photo && <Avatar alt="" src={`/public/profile img/${photo}`} style={{width : "30px", height : "30px"}} />} <strong> { Name && Name } { Prenom && Prenom} </strong></Button>
                            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
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
