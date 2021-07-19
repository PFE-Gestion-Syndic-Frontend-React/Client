import React, {useState} from 'react'
import {TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import GuestVerify from '../../utils/guestVerify';

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
    const classes = useStyles()
    const [compte, setCompte] = useState('')
    //const [msg, setMsg] = useState('')
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tele, setTele] = useState('')
    const [pwd, setPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')
    const id = localStorage.getItem('id')

    useEffect(() => {
        GuestVerify()
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
        else{
            localStorage.clear()
            props.history.push('/Acceuil')
        }
    }, [id, props.history])

    const updateMonCompte = () => {
        if(id !== ""){
            const datasend = { nom : nom, prenom : prenom, tele : tele, pwd : pwd, newPwd : newPwd }
            if(nom === "" && prenom === "" && tele === "" && pwd === "" && newPwd === ""){   
                toast.success("Votre Compte est Enregistré avec Succès")
            }    
            else if(nom !== "" && prenom !== "" && tele !== "" || pwd !== "" && newPwd !== ""){
                axios.put(`http://localhost:5001/monCompte/edit/${id}`, datasend)
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
        }
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
                            <input type="submit" value="Enregistrer" onClick={updateMonCompte} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default Settings