import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Paper, Grow, makeStyles, TextField, IconButton, Button, Dialog, DialogContentText, DialogActions, DialogTitle, DialogContent, Tooltip } from '@material-ui/core';
import { DeleteOutlined, UpdateOutlined, WarningOutlined }from '@material-ui/icons';
import { toast } from 'react-toastify';
import Alert from '@material-ui/lab/Alert'


const useStyles = makeStyles((theme) => ({
    
    textField : {
        width : "720px",
    },
    paper : {
        
    },
  }));



function ListeCompte(props) {
    const History = useHistory()
    const classes = useStyles()
    /*if(!localStorage.getItem("token")){
        props.history.push('/')
    }*/
    const id = localStorage.getItem('id')
    const [compte, setCompte] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [Num, setNum] = useState('')
    const [deleted, setDeleted] = useState('')
    const [noLog, setNoLog] = useState('')

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (NumCompte) => {
        setOpen(true);
        setNum(NumCompte)
    };

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

        axios.get("/users/cops/hasNoLog")
        .then((res) => {
            setNoLog(res.data)
        })
        .catch(()=>{})

        if(search !== ""){
            const run = axios.get("/users/" + search)
            .then((response) => {
                if(response.data.length > 0){
                    setCompte(response.data)
                    setMsg("")
                }
                else {
                    setMsg("No Users")
                    setCompte([])
                }
                
            })
            .catch(() => {})

            return (() => clearInterval(run))
        }
        else{ 
            const run1 = axios.get("/users/all")
            .then((response) => {
                if(response.data.length > 0){
                    setCompte(response.data)
                    setMsg("")
                }
                else{
                    setMsg("No Users")
                    setCompte([])
                }
            })
            .catch(() => {}) 

            return (() => clearInterval(run1))
        }

    }, [search, deleted, msg, History])
    

    const deleteCompte = (NumCompte) => {
        const id = NumCompte 
        axios.delete("/users/delete/" + id)
        .then((response) => {
            if(response.data === "Ce Compte est Li??e ?? un Logement !"){
                toast.warn("Ce Compte est Li??e ?? un Logement !!")
            }
            else if(response.data === "Compte Introuvable"){
                toast.error("Compte Introuvable")
            }
            else if(response.data === "Deleted"){
                toast.info("Le Compte est Supprim?? avec Succ??s")
                setMsg("")
                setDeleted("ok")
            }
        })
        .catch((err) => console.log("err : ", err))
        setOpen(false)
    }


    const updateCompte = (id) => {
        History.push('/compte/edit/' + id)
    }

    return (
        <div>
            <h1 style={{marginLeft : "200px"}}>Lister Les Comptes</h1>
            <div className="container col-md-10 col-md-offset-1"><br/><br/>
                <div className="container col-md-8 col-md-offset-2">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Comptes..." required className={classes.textField} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div><br/>
                {
                    msg === "" &&
                    <Grow  in={useEffect} timeout={4000}>
                        <Paper className={classes.paper}>
                            <table className="table table-hover">
                                <thead>
                                    <tr className="thead-light">
                                        <th>Nom et Pr??nom</th>
                                        <th>Fonction</th>
                                        <th>Email</th>
                                        <th>T??l??phone</th>
                                        <th>Role</th>
                                        <th></th>
                                        <th style={{textAlign : 'center'}} colSpan="3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        compte.map((c) => {
                                            return (
                                                <tr key={c.NumCompte}>
                                                    <td> {c.NomCompte} {c.PrenomCompte} </td>
                                                    <td> {c.fonc} </td>
                                                    <td> {c.EmailCompte} </td>
                                                    <td> {c.telephone} </td>
                                                    <td> {c.Role} </td>
                                                    <td><img src={`profile img/${c.photo}`} alt="" width="60px" /> </td>
                                                    <td>{c.NumCompte !== parseInt(id) && <IconButton onClick={updateCompte.bind(this, c.NumCompte)}><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton>}</td>
                                                    <td>{c.NumCompte !== parseInt(id) && <IconButton onClick={handleOpen.bind(this, c.NumCompte)} ><DeleteOutlined style={{color : "red", fontSize : "30px"}} /></IconButton>}</td>
                                                    <td>
                                                        {
                                                            noLog.length > 0 &&
                                                            noLog.map((n, i) => {
                                                                return (
                                                                    n.NumCompte === c.NumCompte &&
                                                                    <div key={i}>
                                                                        <Tooltip title="No Logement pour ce Copropri??taire"><IconButton><WarningOutlined style={{color : "gold", fontSize : "30px"}} /></IconButton></Tooltip>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </td>
                                                </tr>  
                                            )}
                                        )
                                    }
                                </tbody>
                            </table>
                        </Paper> 
                    </Grow>
                }
                {
                    search !== "" ?
                    <div>{ msg === "No Users" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error" ><strong style={{fontSize : "18px"}}>Aucun Compte Pour Cette Recherche "{search}" </strong></Alert></div>}</div>
                    :
                    <div>{ msg === "No Users" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error" ><strong style={{fontSize : "18px"}}>Aucun Compte Pour l'Instant </strong></Alert></div>}</div>
                }
                
            </div><br/><br/><br/><br/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la Suppression d'un Utilisateur ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Est ce que Voulez-Vous de SUPPRIMER Cet Utilisateur ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={deleteCompte.bind(this, Num)} color="secondary" autoFocus>Oui, Je Supprime !</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ListeCompte
