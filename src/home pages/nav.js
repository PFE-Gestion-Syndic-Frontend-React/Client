import React, { useState } from 'react'
import {Link, useHistory, withRouter} from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tab, Tabs, Paper, MenuItem, Menu, Button, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1600,
    },
  });

function Nav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = useState(null)
    let Name = localStorage.getItem('Name')
    let photo = localStorage.getItem('photo')
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /*const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
    }*/

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const history = useHistory()
    const logout = () => {
        setAnchorEl(null)

        localStorage.clear()
        history.push('/')
    }

    return (
        <div> 
            <Paper square className={classes.root}>
                <AppBar color="transparent">
                    <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
                        <Tab label="GSC" component={Link} to="/home" />
                        <Tab label="Dépense" component={Link} to="/dépenses" />
                        <Tab label="Cotisation" component={Link} to="/cotisations" />
                        <Tab label="Annonce" component={Link} to="/annonces" />
                        <Tab label="Réclamation" component={Link} to="/réclamations" />
                        <Tab label="Comptes" component={Link} to="/comptes" />
                        <Tab label="Logement" component={Link} to="/logement" />
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{photo && <Avatar alt="" src={`/public/profile img/${photo}`} style={{width : "35px"}} />} { Name && Name } </Button>
                        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/settings"> Mon Compte</MenuItem>
                            <MenuItem onClick={logout} >Logout</MenuItem>
                        </Menu>
                    </Tabs>
                </AppBar>
            </Paper>  
        </div>
    )
}

export default withRouter(Nav) 
