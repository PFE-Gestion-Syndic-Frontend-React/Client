import React, {useState} from 'react'
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText,} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

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


function Settings(props) {
    const History = useHistory()
    const classes = useStyles()
    const id = localStorage.getItem('id')
    const [compte, setCompte] = useState('')
    //const [msg, setMsg] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tele, setTele] = useState('')
    const [pwd, setPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const [file, setFile] = useState('')
    const [open, setOpen] =useState(false)
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true)
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

        if(id !== ""){
            axios.get(`/users/user/${id}`)
            .then((response) => {
                if(response.data[0]){
                    setCompte(response.data[0])
                    //setMsg("ok")
                }
            })
            .catch(() => {

            })
        }
        else{
            localStorage.clear()
            props.history.push('/Acceuil')
        }
    }, [id, props.history, History])

    const updateMonCompte = () => {
        if(id !== ""){
            const formdata = new FormData()
            formdata.append('profile', file)
            const datasend = { nom : nom, prenom : prenom, tele : tele, pwd : pwd, newPwd : newPwd }
            if(nom === "" && prenom === "" && tele === "" && pwd === "" && newPwd === "" && file === ""){   
                toast.success("Votre Compte est Enregistré avec Succès")
            }    
            else if((nom !== "" && prenom !== "" && tele !== "" )|| (pwd !== "" && newPwd !== "")){
                axios.put(`/monCompte/edit/${id}`, datasend)
                .then((resolve) => {
                    console.log(resolve.data)
                    if(resolve.data === "Updated"){
                        toast.success("Votre Compte est Enregistré avec Succès")
                    }
                    else if(resolve.data === "Not Updated"){
                        toast.error("Votre Modification est Echouée")
                    }
                })
                .catch((err) => {console.log(err)})
            }
            else if(file !== "" && file !== null){
                axios.put("/upload/profile/" + id, formdata)
                .then((res) => {
                    if(res.data === "Inserted" || res.data === "Inserted and Uploaded"){
                        //setMsg("L'annonce est enregistré avec Success")
                        toast.success('Votre Annonce est Enregistrée avec Succès')
                    }
                    else if(res.data.messageErr === "Bad One"){
                        //setMsg("Really Bad")
                        toast.warn("l'Annonce est échoué ! Réssayez-vous une autre fois..")
                    }
                    else if(res.data.affectedRows !== 0){
                        toast.success("Votre Annonce est Enregistrée avec Succès")
                    }
                })
                .catch((err) => console.log(err))
            }
            else if(nom !== "" && prenom !== "" && tele !== "" && pwd !== "" && newPwd !== "" && file !== ""){
                axios.put("")
                .then(() => axios.put("/upload/profile/" + id, formdata))
                .then((res) => {

                })
                .catch(() => {})
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
                            <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
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