import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    formControl: {
        margin: theme.spacing(1),
        width: 320,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

function AddLogement(props) {
    const classes = useStyles()
    const [log, setLog] = useState('imm')
    const [ty, setTy] =useState('')
    const [email, setEmail] = useState('')
    const [compte, setCompte] = useState([])
    const [msg, setMsg] = useState('')
    const [adr, setadr] = useState('')

    useEffect(() => {
        if(email !== ""){
            axios.get("http://localhost:5001/logements/byEmail/" + email)
            .then((response) => {
                //console.log(response)
                if(response.data.length > 0){
                    setCompte(response.data[0])
                    //console.log(compte)
                    setMsg("Founded")
                }
                else {
                    setMsg("No Users")
                    setCompte(response.data.msggg)
                    //console.log("No User")
                }
            })
            .catch(() => {
                console.log("err")
            })
        }
    }, [email])

    const loger = () => {
        const coproprietaire = compte.NumCompte
        if(adr !== "" && coproprietaire !== ""){
            if(log === "imm" && ty !== ""){
                const refLog = log + " " + ty + " " + adr
                const type = ty
                axios.post("http://localhost:5001/logements/new", {refLog : refLog, type : type, user : coproprietaire})
                    .then((resolve) => {
                        if(resolve.data.message === "Inserted"){
                            setMsg("Le Compte est enregistré avec Success")
                            props.history.push('/logement')
                        }
                        else if(resolve.data.messageErr === "E-mail Already Used !"){
                            setMsg("E-mail est déjà utilisé !!")
                        }
                    })
                    .catch(() => {

                    })
            }
            else{
                const refLog = log + " " + adr
                const type = log
                axios.post("http://localhost:5001/logements/new", {refLog : refLog, type : type, user : coproprietaire})
                    .then((resolve) => {

                    })
                    .catch(() => {

                    })
            }
            
        }
    }
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-house-door-fill"></i> Créer un Logement</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="">
                            <FormControl className={classes.textField} style={{width : "100%"}} >
                                <Select onChange={e => setLog(e.target.value)} displayEmpty className={classes.textField} inputProps={{ 'aria-label': 'Without label' }} >
                                    <MenuItem value="" disabled> Type du Logement </MenuItem>
                                    <MenuItem value={"imm"}>Immeuble</MenuItem>
                                    <MenuItem value={"M"}>Maison</MenuItem>
                                    <MenuItem value={"V"}>Villa</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div><br/>
                    {
                        log === "imm" && 
                        <div className="row container">
                            <div className="col-md-4"><label style={{fontSize : "15px"}}>Type : </label></div>
                            <div className="col-md-4"><input type="radio" name="role" value="app"  onChange={e => setTy(e.target.value)} />  Appartement</div>
                            <div className="col-md-4"><input type="radio" name="role" value="st"  onChange={e => setTy(e.target.value)} />  Studio</div>
                        </div>
                    }
                    <div className="row">
                        <div><br/>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="l'Adresse" required className={classes.textField} onChange={e => setadr(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="l'Adresse E-mail du Copropriétaire" required className={classes.textField} onChange={e => setEmail(e.target.value)} />
                        </div>
                    </div><br/>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/logement" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Valider" onClick={loger} className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div><br/>
            {
                msg === "Founded" && 
                <div className="container col-md-8 col-md-offset-2">
                    <div className="card bg-primary" key={compte.NumCompte} style={{borderRadius : "15px"}}>
                        <div className="card-body">
                            <div className="row">
                                <h5> Nom & Prénom : <strong>{compte.NomCompte} {compte.PrenomCompte} </strong></h5>
                                <h5> Téléphone : <strong>{compte.telephone} </strong></h5>
                                <h5> E-mail : <strong>{compte.EmailCompte} </strong></h5>
                            </div>
                        </div>
                    </div>     
                </div>
            }
        </div>
    )
}

export default AddLogement