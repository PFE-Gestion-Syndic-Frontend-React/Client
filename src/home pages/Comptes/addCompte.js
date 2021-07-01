import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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


function AddCompte(props) {
    const classes = useStyles()
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [tele, setTele] = useState('')
    const [role, setRole] = useState('')
    const [fonc, setFonc] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(email){
            axios.get("http://localhost:5001/users/byEmail/" + email)
            .then((response) => {
                if(response.length > 0){
                    console.log("coool")
                    console.log(response)
                    if(response === "Déjà Utilisé !"){
                        setMsg("E-mail est déjà utilisé !!!")
                    }
                    else if(response === "Cooool"){
                        setMsg("")
                    }
                }
            })
            .catch(() => {
                console.log("err")
            })
        }
    }, [email]) 
    
    
    const createAccount =  () => {
        const datasend = {nom : nom, prenom : prenom, email : email, tele : tele, role : role, fonc : fonc}
        axios.post("http://localhost:5001/users/new", datasend)
        .then((resolve) => {
            if(resolve.data.message === "Inserted"){
                setMsg("Le Compte est enregistré avec Success")
                props.history.push('/comptes')
            }
            else if(resolve.data.messageErr === "E-mail Already Used !"){
                setMsg("E-mail est déjà utilisé !!!")
            }
        })
        .catch((err) => console.log(err))
    }


    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Création d'un Compte</h4></div>
                <div className="card-body">
                    <div>
                        {
                            msg === "Le Compte est enregistré avec Success" && <div className="alert alert-success text-center">{msg}</div>
                        }
                    </div>
                    <div>
                        {
                            msg === "E-mail est déjà utilisé !!!" && <div className="alert alert-danger text-center">{msg}</div>
                        }
                    </div>
                    <div>
                        {
                            msg === "Champs Obligatoires !" && <div className="alert alert-warning text-center">{msg}</div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Nom"  maxLength="30" className={classes.root} required onChange={e => setNom(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Prénom"  maxLength="30" className={classes.root} required onChange={e => setPrenom(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row ">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Adresse E-mail"  maxLength="50" className={classes.root} required onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Numéro de Téléphone"  maxLength="10" className={classes.root} required onChange={e => setTele(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row container">
                        <div className="col-md-4"><label style={{fontSize : "15px"}}>Role : </label></div>
                        <div className="col-md-4"><input type="radio" name="role" value="Administrateur"  onChange={e => setRole(e.target.value)} />  Administrateur</div>
                        <div className="col-md-4"><input type="radio" name="role" value="Copropriétaire"  onChange={e => setRole(e.target.value)} />  Copropriétaire</div>
                    </div><br/>
                    {
                        role === "Copropriétaire" && 
                        <div className="row container">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Fonction au sein du Syndicat"  maxLength="30" className={classes.root} defaultValue={role} required onChange={e => setFonc(e.target.value)} />
                        </div>
                    }
                    {
                        role === "Administrateur" &&
                        <div className="row container">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Fonction au sein du Syndicat"  maxLength="30" className={classes.root} required onChange={e => setFonc(e.target.value)} />
                        </div>
                    }
                    {
                        role === "" &&
                        <div className="row container">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Fonction au sein du Syndicat"  maxLength="30" className={classes.root} required onChange={e => setFonc(e.target.value)} />
                        </div>
                    }
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/comptes" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Enregistrer" onClick={createAccount} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default AddCompte
