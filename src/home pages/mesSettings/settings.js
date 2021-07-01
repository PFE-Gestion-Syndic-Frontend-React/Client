import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';


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
    const [msg, setMsg] = useState('')

    const id = localStorage.getItem('id')
    useEffect(() => {
        if(id !== ""){
            axios.get(`http://localhost:5001/users/user/${id}`)
            .then((response) => {
                if(response.data[0]){
                    console.log(response.data[0])
                    setCompte(response.data[0])
                    setMsg("ok")
                }
            })
            .catch(() => {

            })
        }
    }, [id])

    const updateMonCompte = () => {
        
    }
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Mettre à Jour Mon Compte</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Nom" multiline={true} className={classes.root} defaultValue={compte.NomCompte} required maxLength="30"  />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Prénom" multiline={true} className={classes.root} defaultValue={compte.PrenomCompte} required  maxLength="30" />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Adresse E-mail" multiline={true} className={classes.root} defaultValue={compte.EmailCompte} required type="email" maxLength="50" />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Numéro de Téléphone" multiline={true} className={classes.root} defaultValue={compte.telephone} required maxLength="10" />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Ancien Mot de Passe" className={classes.root} type="password" />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Ancien Mot de Passe" className={classes.root} type="password" maxLength="20" />
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
