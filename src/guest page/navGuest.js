import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Paper, AppBar, Tabs, Tab, Button, Menu, MenuItem, Avatar} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'
import GuestVerify from '../utils/guestVerify'

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      maxWidth: 1600,
    },
  });


function NavGuest() {
    const id = localStorage.getItem('id')
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = useState(null)
    const [load, setLoad] = useState('')
    const [Name, setName ]= useState('')
    const [Prenom, setPrenom] = useState('')
    const [photo, setPhoto] = useState('')
    //let token = localStorage.getItem('token')
    const [OK, setOK] = useState(true)

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

    useEffect(() => {
        GuestVerify()
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
                <AppBar className="" style={{width : "100%"}} color="default">
                    <Tabs value={value} onChange={handleChange} variant="fullwidth" indicatorColor="primary" textColor="primary">
                        <Tab style={{width : "150px"}} label="GSC" component={Link} to="/Acceuil" onClick={()=> setLoad("GSC")} />
                        <Tab style={{width : "150px"}} label="Dépense" component={Link} to="/Dépenses" onClick={()=> setLoad("Dépense")} />
                        <Tab style={{width : "150px"}} label="Cotisation" component={Link} to="/Cotisations" onClick={()=> setLoad("Cotisation")} />
                        <Tab style={{width : "150px"}} label="Annonce" component={Link} to="/Annonces" onClick={()=> setLoad("Annonce")} />
                        <Tab style={{width : "200px"}} label="Réclamation" component={Link} to="/Réclamations" onClick={()=> setLoad("Réclamation")} />
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>{photo && <Avatar alt="" src={`profile img/${photo}`} style={{width : "30px", height : "30px"}} />} &nbsp;&nbsp;&nbsp; <strong> { Name && Name } { Prenom && Prenom} </strong></Button>
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
