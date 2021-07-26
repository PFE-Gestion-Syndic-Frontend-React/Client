import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Paper, AppBar, Tabs, Tab, Button, Menu, MenuItem, Avatar} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'

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
    const History = useHistory()
    const id = localStorage.getItem('id')
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = useState(null)
    const [load, setLoad] = useState('')
    const [Name, setName ]= useState('')
    const [Prenom, setPrenom] = useState('')
    const [photo, setPhoto] = useState('')
    const [OK, setOK] = useState(true)

    if(OK){}

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
        axios.get("/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve.data.role === "Copropriétaire"){

            }
            else if(resolve.data.role !== "Copropriétaire"){
                localStorage.clear()
                History.push('/')
            }
            else if(resolve.data.msg === "Incorrect token !"){
                console.log("Incorrect Token")
                localStorage.clear()
                History.push('/')
            }
            else{ //added
                localStorage.clear()
                History.push('/')
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
    }, [id, load, Name, Prenom, photo, History])


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
                    <Tabs value={value} onChange={handleChange}  indicatorColor="primary" textColor="primary">
                        <Button style={{width : "250px"}} label="GSC" component={Link} to="/Acceuil" onClick={()=> setLoad("GSC")} ><Avatar src={'G.S.C.png'} alt="" style={{width : "40px", height : "40px"}} /></Button>
                        <Tab style={{width : "250px"}} label="Dépense" component={Link} to="/Dépenses" onClick={()=> setLoad("Dépense")} />
                        <Tab style={{width : "250px"}} label="Cotisation" component={Link} to="/Cotisations" onClick={()=> setLoad("Cotisation")} />
                        <Tab style={{width : "250px"}} label="Annonce" component={Link} to="/Annonces" onClick={()=> setLoad("Annonce")} />
                        <Tab style={{width : "250px"}} label="Réclamation" component={Link} to="/Réclamations" onClick={()=> setLoad("Réclamation")} />
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{width : "270px"}}>{photo && <Avatar alt="" src={`public/profile img/${photo}`} style={{width : "30px", height : "30px"}} />} &nbsp;&nbsp;&nbsp; <strong> { Name && Name } { Prenom && Prenom} </strong></Button>
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
