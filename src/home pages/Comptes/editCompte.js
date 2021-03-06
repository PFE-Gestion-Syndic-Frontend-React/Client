import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop : theme.spacing(1),
      textAlign : 'center',
      width: "95%",
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 325,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 320,
    },
  }));


function EditCompte(props) {
    const History = useHistory()
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tele, setTele] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false);

    if(msg){}


    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true) 
    };
  
    
    const id = props.match.params.id
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

        if(id !== ""){
            axios.get(`/users/user/${id}`)
            .then(res => 
            {
                if(res.data.msgErr === "Not Found"){
                    setMsg("Not Allowed")
                    setUser({})
                }
                else{
                    setUser(res.data[0])
                }
            })
            .catch(() => {})
        }
    }, [id, History])


    const UpdateAccount = (e) => {
        if(nom !== "" && prenom !== "" && tele !== ""){
            const dataUpdated = {nom : nom, prenom : prenom, tele : tele }
            console.log("news : ", dataUpdated)
            if(id !== ""){
                axios.put(`/users/edit/${id}`, dataUpdated)
                .then((response) => {
                    if(response.data.message === "Updated Successfully"){
                        setMsg(response.data.message)
                        //console.log(msg)
                        props.history.push('/comptes')
                        toast.success("La Modification du Compte est effectu?? avec Succ??s")
                    }
                    else{
                        //console.log("okkk")
                    }
                })
                .catch(() => console.log("Bad"))
            }
        }
        else if(nom === "" && prenom === "" && tele === ""){
            toast.success("Le Compte a ??t?? modifi?? avec Succ??s")
            props.history.push('/comptes')
        }
        else{
            toast.warn("Les Champs qui ont (*) sont Obligatoires")
        }
    }

    const reset = (Num, Nom, Prenom) => {
        if(Nom !== "" && Prenom !== ""){
            const datasend = {nom : Nom, prenom : Prenom}
            axios.put(`/users/reset/password/${Num}`, datasend)
            .then((resolve) => {
                if(resolve.data === "Updated"){
                    toast.success("Le Mot de Passe est R??intialis?? avec Succ??s")
                    props.history.push('/comptes')
                }
            })
            .catch((err) => {console.log(err)})
        }
        setOpen(false)
    }


    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Mettre ?? Jour Le Compte</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Nom"  maxLength="30" className={classes.root} multiline={true} defaultValue={user.NomCompte} required onChange={e => setNom(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Pr??nom"  maxLength="30" className={classes.root} multiline={true} defaultValue={user.PrenomCompte}  required onChange={e => setPrenom(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Adresse E-mail"  maxLength="50" className={classes.root} disabled value={user.EmailCompte} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Num??ro de T??l??phone"  maxLength="10" className={classes.root} multiline={true} defaultValue={user.telephone} required onChange={e => setTele(e.target.value)} />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/comptes" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Mettre ?? Jour" onClick={UpdateAccount} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Reset Password for the User</Button>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de R??initialisation du Mot de Passe ?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Est ce que Voulez-Vous de R??intialiser le Mot de Passe de Cet Utilisateur ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={reset.bind(this, user.NumCompte, user.NomCompte, user.PrenomCompte)} color="secondary" autoFocus>Oui, J'accepte !</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className="col-md-3"></div>
            </div><br/>
        </div>
    )
}

export default EditCompte
