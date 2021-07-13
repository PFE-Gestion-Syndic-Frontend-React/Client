import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText,} from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      
      marginTop : theme.spacing(1),
      width: 700,
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 320,
        },
    },
  }));


function Settings() {
    const classes = useStyles()
    const [compte, setCompte] = useState('')
    //const [msg, setMsg] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tele, setTele] = useState('')
    const [pwd, setPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [open, setOpen] =useState(false)
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true)
    }

    const id = localStorage.getItem('id')
    useEffect(() => {
        if(id !== ""){
            axios.get(`http://localhost:5001/users/user/${id}`)
            .then((response) => {
                if(response.data[0]){
                    setCompte(response.data[0])
                    //setMsg("ok")
                }
            })
            .catch(() => {

            })
        }
    }, [id])

    const updateMonCompte = () => {
        if(id!== ""){
            if(nom !== "" && prenom !== "" && tele !== ""){
                if(pwd !== "" && newPwd !== ""){
                    const datasend = { nom : nom, prenom : prenom, tele : tele, pwd : pwd, newPwd : newPwd }
                    axios.put(`http://localhost:5001/users/monCompte/edit/${id}`, datasend)
                    .then((resolve) => {
                        console.log(resolve)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
                else{
                    const datasend = { nom : nom, prenom : prenom, tele : tele }
                    console.log(datasend)
                    axios.put(`http://localhost:5001/users/monCompte/edit/${id}`, datasend)
                    .then((resolve) => {
                        console.log(resolve)
                    })
                    .catch((err) => {
                        if(err){
                            console.log(err)
                        }
                    })
                }
            }
            else if(nom === "" && prenom === "" && tele === ""){
                toast.success("Votre Profile est modifié avec Succès")
            }
        }
        setOpen(false)
    }

    
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Mettre à Jour Mon Compte</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Nom" multiline={true} className={classes.root} defaultValue={compte.NomCompte} required maxLength="30" onChange={e => setNom(e.target.value)}  />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Prénom" multiline={true} className={classes.root} defaultValue={compte.PrenomCompte} required  maxLength="30" onChange={e => setPrenom(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Adresse E-mail" multiline={true} className={classes.root} defaultValue={compte.EmailCompte} disabled required type="email" maxLength="50" />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Numéro de Téléphone" multiline={true} className={classes.root} defaultValue={compte.telephone} required maxLength="10" onChange={e => setTele(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Ancien Mot de Passe" className={classes.root} type="password" onChange={e => setPwd(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Ancien Mot de Passe" className={classes.root} type="password" maxLength="20" onChange={e => setNewPwd(e.target.value)} />
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-6">
                            <label style={{fontSize : "15px"}}>Sélectionner Votre Avatare : </label>
                        </div>
                        <div className="col-md-6">
                            <input type="file" accept=".png" className="form-control" />
                        </div>
                    </div><br /><br/>
                    <div className="row">
                        <div className="">
                            <input type="submit" value="Enregistrer" onClick={handleClickOpen} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de mettre à jour mon Compte ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Est ce que vous etes sure de mettre ces modifications !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={updateMonCompte} color="secondary" autoFocus>Oui, Je Confirme !</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Settings
