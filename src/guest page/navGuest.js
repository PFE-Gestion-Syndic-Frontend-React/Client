import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Paper, AppBar, Tabs, Tab, Button, Menu, MenuItem, Avatar} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1600,
    },
  });


function NavGuest() {

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
            <Paper square className={classes.root}>
                <AppBar className="" style={{width : "100%"}} color="transparent">
                    <Tabs value={value} onChange={handleChange} variant="fullwidth" indicatorColor="primary" textColor="primary">
                        <Tab style={{width : "150px"}} label="GSC" component={Link} to="/Acceuil" />
                        <Tab style={{width : "150px"}} label="Dépense" component={Link} to="/Dépenses" />
                        <Tab style={{width : "150px"}} label="Cotisation" component={Link} to="/Cotisations" />
                        <Tab style={{width : "150px"}} label="Annonce" component={Link} to="/Annonces" />
                        <Tab style={{width : "200px"}} label="Réclamation" component={Link} to="/Réclamations" />
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{photo && <Avatar alt="" src={`/public/profile img/${photo}`} style={{width : "30px", height : "30px"}} />} <strong> { Name && Name } { Prenom && Prenom} </strong></Button>
                        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose} component={Link} to="/Settings"> Mon Compte</MenuItem>
                            <MenuItem onClick={logout} >Logout</MenuItem>
                        </Menu>
                    </Tabs>
                </AppBar>
            </Paper>  
        </div>
    )
}

export default NavGuest
