import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles, TextField } from '@material-ui/core';
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


function AddCompte(props) {
    const History = useHistory()
    const classes = useStyles()
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [tele, setTele] = useState('')
    const [role, setRole] = useState('')
    const [fonc, setFonc] = useState('')
    const [msg, setMsg] = useState('')

    if(msg){}

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

        if(email){
            axios.get("/users/byEmail/" + email)
            .then((response) => {
                if(response){
                    if(response.data.msg === "D??j?? Utilis?? !"){
                        setMsg("E-mail est d??j?? utilis?? !!!")
                        toast.error("Cette Adresse E-mail est d??j?? Utilis??e !")
                    }
                    else if(response.data.msg === "Cooool"){
                        setMsg("")
                    }
                }
            })
            .catch(() => {})
        }
    }, [email, History]) 
    
    
    const createAccount =  () => {
        if(role === "Copropri??taire"){
            setFonc("Copropri??taire")
        }
        if(nom !== "" && prenom !== "" && email !== "" && tele !== "" && role !== ""){
            const datasend = {nom : nom, prenom : prenom, email : email, tele : tele, role : role, fonc : fonc}
            axios.post("/users/new", datasend)
            .then((resolve) => {
                if(resolve.data.message === "Inserted"){
                    setMsg("Le Compte est enregistr?? avec Success")
                    props.history.push('/comptes')
                    toast.success("La Cr??ation du Compte est effectu??e avec Succ??s")
                }
                else if(resolve.data.msgErr === "Duplicate Email"){
                    toast.error("Cette Adresse E-mail est D??j?? Utilis??e !")
                }
                else if(resolve.data.messageErr === "E-mail Already Used !"){
                    setMsg("E-mail est d??j?? utilis?? !!!")
                    toast.error("E-mail est d??j?? Utilis?? !")
                }
            })
            .catch(() => {})
        }
        else{
            toast.warn("Les Champs qui ont (*) sont Obligatoires")
        }
    }


    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Cr??ation d'un Compte</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" name="nom" label="Votre Nom" InputProps={{maxLength : "30"}} className={classes.root} required onChange={e => setNom(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" name="prenom" label="Votre Pr??nom" InputProps={{maxLength : "30"}} className={classes.root} required onChange={e => setPrenom(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row ">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" name="email" label="Votre Adresse E-mail"  InputProps={{maxLength : "50"}} className={classes.root} required onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" name="tele" label="Votre Num??ro de T??l??phone" InputProps={{maxLength : "10"}} className={classes.root} required onChange={e => setTele(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row container">
                        <div className="col-md-4"><label style={{fontSize : "15px"}}>Role : </label></div>
                        <div className="col-md-4"><input type="radio" name="role" value="Administrateur"  onChange={e => setRole(e.target.value)} />  Administrateur</div>
                        <div className="col-md-4"><input type="radio" name="role" value="Copropri??taire"  onChange={e => setRole(e.target.value)} />  Copropri??taire</div>
                    </div><br/>
                    {
                        role === "Copropri??taire" && 
                        <div className="row container">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" name="fonc" label="Votre Fonction au sein du Syndicat"  InputProps={{maxLength : "30"}} className={classes.root} defaultValue={role} required onChange={e => setFonc("Copropri??taire")} />
                        </div>
                    }
                    {
                        role === "Administrateur" &&
                        <div className="row container">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" name="fonc" label="Votre Fonction au sein du Syndicat"  InputProps={{maxLength : "30"}} className={classes.root} required onChange={e => setFonc(e.target.value)} />
                        </div>
                    }
                    {
                        role === "" &&
                        <div className="row container">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" name="fonc" label="Votre Fonction au sein du Syndicat"  InputProps={{maxLength : "30"}} className={classes.root} required onChange={e => setFonc(e.target.value)} />
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
