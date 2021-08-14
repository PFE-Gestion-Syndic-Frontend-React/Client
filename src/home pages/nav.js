import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Paper, MenuItem, Menu, Button, Avatar, IconButton, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import axios from 'axios';
import { Settings, ExitToAppOutlined, AccountCircle, NotificationsActiveOutlined, Assignment, AccountBalanceWallet, CreditCardOutlined, HomeOutlined } from '@material-ui/icons'
// import MapsHomeWorkIcon from '@material-ui/icons/MapsHomeWork';

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

function Nav(props) {
    const History = useHistory()
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

    if(load){}
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

        if(id !== "" && id !== undefined){
            axios.get(`/me/${id}`)
            .then((resolve) => {
                if(resolve.data[0]){
                    setName(resolve.data[0].NomCompte)
                    setPrenom(resolve.data[0].PrenomCompte)
                    setPhoto(resolve.data[0].photo)
                }
            })
            .catch(()=>{})
        }
    }, [id, Name, Prenom, photo, History])

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
                        <BottomNavigation value={value} onChange={handleChange} showLabels>
                            <Button label="G.S.C." component={Link} to="/home" onClick={()=> setLoad("GSC")} style={{width : "220px"}} icon={"G.S.C.png"}><Avatar src="G.S.C.png" style={{width : "35px", height : "35px"}} /></Button>
                            <BottomNavigationAction label="Dépense" component={Link} to="/dépenses" onClick={()=> setLoad("Dépense")} style={{width : "175px"}} icon={<CreditCardOutlined />} />
                            <BottomNavigationAction label="Cotisation" component={Link} to="/cotisations" onClick={()=> setLoad("Cotisation")} style={{width : "180px"}} icon={<AccountBalanceWallet/>} />
                            <BottomNavigationAction label="Annonce" component={Link} to="/annonces" onClick={()=> setLoad("annonce")} style={{width : "180px"}} icon={<NotificationsActiveOutlined />} />
                            <BottomNavigationAction label="Réclamation" component={Link} to="/réclamations" onClick={()=> setLoad("réclamation")} style={{width : "180px"}} icon={<Assignment/>} />
                            <BottomNavigationAction label="Comptes" component={Link} to="/comptes" onClick={()=> setLoad("compte")} style={{width : "170px"}} icon={<AccountCircle/>} />
                            <BottomNavigationAction label="Logement" component={Link} to="/logement" onClick={()=> setLoad("logement")} style={{width : "170px"}} icon={<HomeOutlined />} />
                            <Button aria-controls="simple-menu" aria-haspopup="tree" onClick={handleClick} style={{width : "200px"}} >{photo && <Avatar alt="" src={`profile img/${photo}`} style={{width : "30px", height : "30px"}} />} &nbsp;&nbsp;&nbsp; <strong> { Name && Name } { Prenom && Prenom} </strong></Button>
                            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} >
                                <MenuItem onClick={handleClose} component={Link} to="/settings"><IconButton><Settings style={{color : "blue", width : "25px", height : "25px"}} /></IconButton>  Mon Compte</MenuItem>
                                <MenuItem onClick={logout}><IconButton><ExitToAppOutlined style={{color : "red", width : "25px", height : "25px"}} /></IconButton> Logout</MenuItem>
                            </Menu>
                        </BottomNavigation>
                    </AppBar>
                </Paper>  
            }
        </div>
    )
}

export default Nav
