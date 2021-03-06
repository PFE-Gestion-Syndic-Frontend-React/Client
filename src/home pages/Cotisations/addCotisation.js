import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { InputLabel, MenuItem, Select, FormControl, TextField, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop : theme.spacing(1),
      textAlign : 'center',
      width: "100%",
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 320,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 700,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    
  }));




function AddCotisation(props) {
    const History = useHistory()
    const classes = useStyles()
    let cotMontanat = 200
    const [Accounts, setAccounts] = useState([])
    const [mois, setMois] = useState(1)
    const [methode, setMethode] = useState("Espèce")
    const [log, setLog] = useState('')
    const [bnq, setBnq] = useState('')
    const [cheque, setCheque] = useState('')
    const [msg, setMsg] = useState('')
    const [lastPaied, setLastPaied] = useState('')
    const id = localStorage.getItem('id')

    if(msg){}

    const Valider = () => {
        if(id !== "" && log !== "" && mois !== "" && methode !== "" ){
            var Year = new Date().getFullYear()
            var month = new Date().getMonth() + 1
            var hour = new Date().getHours()
            var minute = new Date().getMinutes()
            var secondes = new Date().getSeconds()
            var paied = month + "" + Year + "" + hour + "" + minute + "" + secondes
            //console.log(paied)
            const montant = mois * cotMontanat
            if(methode === "Chèque" && bnq !== "" && cheque !== ""){
                const datasend = {id : id, paied : paied, log : log, mois : mois, montant : montant, methode : methode, cheque : cheque, bnq : bnq}
                axios.post("/cotisations/new/cheque", datasend)
                .then((resolve) => {
                    if(resolve.data.message === "Inserted"){
                        props.history.push('/cotisations')
                        toast.success("La Cotisation est enregistrée avec Succès")
                    }
                })
                .catch((err) => {
                    //console.log("failed Chèque")
                })
            }
            else if(methode === "Espèce"){
                const datasend = {id : id, paied : paied, log : log, mois : mois, montant : montant, methode : methode}
                axios.post("/cotisations/new/espece", datasend)
                .then((resolve) => {
                    //console.log(resolve)
                    if(resolve.data.message === "Inserted"){
                        props.history.push('/cotisations')
                        toast.success("La Cotisation est enregistrée avec Succès")
                    }
                })
                .catch((err) => {})
            }
        }
    }
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


        const run = axios.get("/users/logement/cop")
        .then((resolve) => {
            if(resolve.data.length > 0){
                setAccounts(resolve.data)
                setMsg("data")
            }
            else{
                setAccounts()
                setMsg("")
            }
        })
        .catch((err) => {})

        if(log !== ""){
            const run1 = axios.get("/cotisations/getLastPaiement/" + log)
            .then((res) =>{
                console.log(res.data)
                if(res.data.length === 0){
                    setLastPaied("No Cots")
                }
                else{
                    setLastPaied(res.data[0])
                    console.log(res.data[0])
                }
            })
            .catch(()=>{})

            return (() => clearInterval(run1))
        }
        return(() => clearInterval(run))
    }, [History, log])


    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Enregistrement d'une Cotisation </h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">Le Logement Concerné : </InputLabel>
                                <Select style={{width : "100%"}} onChange={e => setLog(e.target.value)} className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }} >
                                    {
                                        Accounts.map((ac) => {
                                            return(
                                                <MenuItem key={ac.RefLogement} value={ac.RefLogement}> <strong>{ac.RefLogement}.</strong> Pour : <strong>{ac.NomCompte} {ac.PrenomCompte} </strong>  </MenuItem> 
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>    
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField className={classes.textField} InputLabelProps={{ shrink: true,}} id="Nombre de Mois" label="Nombre de Mois" type="number" defaultValue="1" onChange={e => setMois(e.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            {
                                mois !== "" && <label style={{paddingTop : "25px"}}> Montant TTC : <strong style={{color : "blue", fontSize : "20px"}}>  {mois * cotMontanat} Dhs</strong></label>
                            }
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-12">
                            <FormControl className={classes.formControl}>
                                <InputLabel shrink id="demo-simple-select-placeholder-label-label">Méthode de Paiement</InputLabel>
                                <Select style={{width : "100%"}} className={classes.selectEmpty} id="Méthode de Paiement" label="Méthode de Paiement" defaultValue={"Espèce"} defaultChecked={"Espèce"} onChange={e => setMethode(e.target.value)}>
                                    <MenuItem value="Espèce"> Espèce </MenuItem>
                                    <MenuItem value="Chèque"> Chèque </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div><br/>
                    {
                        methode === "Chèque" && 
                        <div className="row">
                            <div className="col-md-6">
                                <TextField className={classes.textField} InputLabelProps={{ shrink: true,}} id="N° Chèque" label="N° Chèque" onChange={e => setCheque(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <TextField className={classes.textField} InputLabelProps={{ shrink: true,}} id="Banque" label="La Banque" onChange={e => setBnq(e.target.value)} />
                            </div><br />
                        </div>
                    }
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/cotisations" className="form-control btn btn-outline-danger" >Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Valider" className="form-control btn btn-primary" onClick={Valider} />
                        </div>
                    </div>
                </div>
            </div><br/><br/>
            {
                log !== "" &&
                <div>
                    {
                        lastPaied === "No Cots" && 
                        <Alert severity="warning"><strong>Ce Copropriétaire n'a Aucune Cotisation !</strong></Alert>
                    }
                    {
                        lastPaied !== "No Cots" &&
                        <Alert severity="info">
                            <div className="row"><h6 className="center"><strong style={{marginLeft : "70px"}}>La Fiche Du Dernier Paiement ({log})</strong></h6></div>
                            <div className="row">
                                <div className="col-md-7">La Référence du Paiement : <strong>{lastPaied.RefPaiement}</strong></div>
                                <div className="col-md-5">Date Paiement : <strong>{lastPaied.datePaiement && lastPaied.datePaiement.replace("T23:00:00.000Z", "")}</strong></div>
                            </div>
                            <div className="row">
                                <div className="col-md-7">Méthode du Paiement : <strong>{lastPaied.MethodePaiement}</strong></div>
                                <div className="col-md-5">Montant : <strong>{lastPaied.Montant} X ({lastPaied.NbrMois} mois) MAD </strong></div>
                            </div>
                            <div className="row">
                                <div className="col-md-7">Du : <strong>{lastPaied.DU && lastPaied.DU.replace("T23:00:00.000Z", "")}</strong></div>
                                <div className="col-md-5">Au : <strong>{lastPaied.AU && lastPaied.AU.replace("T23:00:00.000Z", "")}</strong></div>
                            </div><br/>
                            {
                                lastPaied.difs > 0 &&
                                <div className="row"><div className="col-md-12"><h3 style={{color : "red", textAlign : "center"}}>Le Montant à Payer : {lastPaied.difs * 200} MAD </h3></div></div>}
                            {
                                lastPaied.difs <= 0 &&
                                <div className="row"><h3 style={{color : "green", textAlign : "center"}}>Son Situation financièr est OK.</h3></div>
                            }
                        </Alert>
                    }
                </div>
            }
            <br/><br/><br/><br/><br/>
        </div>
    )
}

export default AddCotisation
