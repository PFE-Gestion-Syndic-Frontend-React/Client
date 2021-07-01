import axios from 'axios'
import React, {useEffect, useState} from 'react'
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


function EditCompte(props) {
    const classes = useStyles()
    const [user, setUser] = useState({})
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tele, setTele] = useState('')
    const [role, setRole] = useState('')
    const [fonc, setFonc] = useState('')
    const [msg, setMsg] = useState('')

    
    const id = props.match.params.id
    useEffect(() => {
        if(id !== ""){
            axios.get(`http://localhost:5001/users/user/${id}`)
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
            .catch(() => console.log("Cannot Read Data"))
        }
    }, [])


    const UpdateAccount = () => {
        //console.log("clicked")
        if(nom !== "" && prenom !== "" && tele !== "" && fonc !== ""){
            const dataUpdated = {nom : nom, prenom : prenom, fon : fonc, tele : tele, role : role}
            console.log(dataUpdated)
            if(id !== ""){
                axios.put(`http://localhost:5001/users/edit/${id}`, dataUpdated)
                .then((response) => {
                    //console.log(response)
                    if(response.data.message === "Updated Successfully"){
                        setMsg(response.data.message)
                        //console.log(msg)
                        props.history.push('/comptes')
                    }
                    else{
                        //console.log("okkk")
                    }
                })
                .catch(() => console.log("Bad"))
            }
        }
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Mettre à Jour Le Compte</h4></div>
                <div className="card-body">
                    <div>
                        {
                            msg === "Updated Successfully" && <div className="alert alert-success text-center">{msg}</div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Nom"  maxLength="30" className={classes.root} multiline={true} defaultValue={user.NomCompte} required onChange={e => setNom(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Prénom"  maxLength="30" className={classes.root} multiline={true} defaultValue={user.PrenomCompte}  required onChange={e => setPrenom(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Adresse E-mail"  maxLength="50" className={classes.root} disabled value={user.EmailCompte} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Numéro de Téléphone"  maxLength="10" className={classes.root} multiline={true} defaultValue={user.telephone} required onChange={e => setTele(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="">
                        {
                            user.Role === "Administrateur" && 
                            <div className="row">
                                <div className="col-md-4"><label style={{fontSize : "15px"}}>Role : </label></div>
                                <div className="col-md-4"><input type="radio" name="role" value="Administrateur" checked={true} onChange={e => setRole(e.target.value)} />  Administrateur</div>
                                <div className="col-md-4"><input type="radio" name="role" value="Copropriétaire" checked={false}  onChange={e => setRole(e.target.value)} />  Copropriétaire</div>
                            </div>
                        }
                        {
                            user.Role === "Copropriétaire" && 
                            <div className="row">
                                <div className="col-md-4"><label style={{fontSize : "15px"}}>Role : </label></div>
                                <div className="col-md-4"><input type="radio" name="role" value="Administrateur" checked={false} onChange={e => setRole(e.target.value)} />  Administrateur</div>
                                <div className="col-md-4"><input type="radio" name="role" value="Copropriétaire" checked={true}  onChange={e => setRole(e.target.value)} />  Copropriétaire</div>
                            </div>
                        }
                    </div><br/>
                    <div className="row">
                        <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Fonction au sein le Syndicat"  maxLength="30" className={classes.root} multiline={true} defaultValue={user.fonc}  required onChange={e => setFonc(e.target.value)} />
                    </div><br/>
                    
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/comptes" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Mettre à Jour" onClick={UpdateAccount} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default EditCompte
