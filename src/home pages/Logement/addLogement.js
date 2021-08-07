import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { InputLabel, makeStyles, TextField, FormControl, Select, MenuItem } from '@material-ui/core';
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
    formControl: {
        margin: theme.spacing(1),
        width: 320,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

function AddLogement(props) {
    const History = useHistory()
    const classes = useStyles()
    const [log, setLog] = useState('')
    const [ty, setTy] =useState('')
    const [num, setNum] = useState('')
    const [compte, setCompte] = useState([])
    const [msg, setMsg] = useState('')
    const [lib, setLib] = useState('')
    const [adr, setadr] = useState('')

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

        axios.get("/logements/Coproprietaire/byEmail")
        .then((response) => {
            console.log(response)
            if(response.data.length > 0){
                setCompte(response.data)
                //console.log(compte)
                setMsg("Founded")
            }
            else {
                setMsg("No Users")
                setCompte(response.data.msggg)
                console.log("No User")
                toast.warn("Aucune Information !")
            }
        })
        .catch(() => {
            console.log("err")
        })
    }, [History])


    const loger = () => {
        const coproprietaire = num
        if(adr !== "" && coproprietaire !== ""){
            if(log === "imm" && ty !== ""){
                const refLog = log + " " + lib + " " + ty + " " + adr
                const type = ty
                axios.post("/logements/new", {refLog : refLog, type : type, user : coproprietaire})
                    .then((resolve) => {
                        if(resolve.data.message === "Inserted"){
                            setMsg("Le Compte est enregistré avec Success")
                            props.history.push('/logement')
                            toast.success("Le Logement est enregistré avec Succès")
                        }
                        else if(resolve.data.messageErr === "le Logement est Déjà Inseré !"){
                            setMsg("le Logement est Déjà existe !")
                            toast.error("Le Logement est déjà Existe !")
                        }
                    })
                    .catch((err) => {
                        if(err.mssg === "le Logement est Déjà Inseré !"){
                            setMsg("le Logement est Déjà existe !")
                            toast.error("Le Logement est déjà Existe !")
                        }
                    })
            }
            else{
                const refLog = log + " " + adr
                const type = log
                axios.post("/logements/new", {refLog : refLog, type : type, user : coproprietaire})
                    .then((resolve) => {
                        if(resolve.data.message === "Inserted"){
                            setMsg("Le Compte est enregistré avec Success")
                            props.history.push('/logement')
                            toast.success("Le Logement est enregistré avec Succès")
                        }
                        else if(resolve.data.messageErr === "le Logement est Déjà Inseré !"){
                            setMsg("le Logement est Déjà existe !")
                            toast.error("Le Logement est déjà Existe !")
                        }
                    })
                    .catch((err) => {
                        if(err.mssg === "le Logement est Déjà Inseré !"){
                            setMsg("le Logement est Déjà existe !")
                            toast.error("Le Logement est déjà Existe !")
                        }
                    })
            }
            
        }
        else{
            setMsg("Champs Obligatoires")
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
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">Type de Logement</InputLabel>
                                <Select onChange={e => setLog(e.target.value)} displayEmpty className={classes.textField} inputProps={{ 'aria-label': 'Without label' }} >
                                    <MenuItem value="imm"> Immeuble </MenuItem>
                                    <MenuItem value="M"> Maison </MenuItem>
                                    <MenuItem value="V"> Villa </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div><br/>
                    {
                        log === "imm" && 
                        <div>
                            <div className="row container">
                                <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Libellé d'immeuble" required className={classes.textField} onChange={e => setLib(e.target.value)} />
                            </div><br/> 
                            <div className="row container">
                                <div className="col-md-4"><label style={{fontSize : "15px"}}>Type : </label></div>
                                <div className="col-md-4"><input type="radio" name="role" value="app"  onChange={e => setTy(e.target.value)} />  Appartement</div>
                                <div className="col-md-4"><input type="radio" name="role" value="st"  onChange={e => setTy(e.target.value)} />  Studio</div>
                            </div>
                        </div>
                    }
                    <div className="row">
                        <div><br/>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="l'Adresse" required className={classes.textField} onChange={e => setadr(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div>
                            <FormControl required InputLabelProps={{ shrink: true,}}  id="standard-basic" label="l'Adresse E-mail du Copropriétaire" className={classes.textField} style={{width : "100%"}} >
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">Le Copropriétaire</InputLabel>
                                <Select onChange={e => setNum(e.target.value)} className={classes.textField}  >
                                    {
                                        compte.map((co) => {
                                            return(
                                                <MenuItem value={co.NumCompte}> {co.NomCompte} {co.PrenomCompte} </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
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
        </div>
    )
}

export default AddLogement