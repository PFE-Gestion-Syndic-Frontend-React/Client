import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormControl, InputLabel, Select, MenuItem, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import Util from '../../utils/util'



const useStyle = makeStyles((theme) => ({
    
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
            width: 200,
        },
    },
    combo : {
        width : 700,
    },
  }));


function EditCotisation(props) {
    const classes = useStyle()
    const RefPaiement = props.match.params.RefPaiement
    const [open, setOpen] = useState(false)
    const [cotisation, setCotisation] = useState('')
    const [msg, setMsg] = useState('')
    const [mois, setMois] = useState('1')
    const [methode, setmethode] = useState('Espèce')
    const [cheque, setCheque] = useState('')
    const [bnq, setBnq] = useState('')
    //const [Au, setAu] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        Util()

        axios.get("http://localhost:5001/cotisations/getData/" + RefPaiement)
        .then((resolve) => {
            if(resolve.data === "err"){
                console.log("Err")
                setMsg('')
                setCotisation('')
            }
            setCotisation(resolve.data[0])
            setMsg('data')
        })
        .catch()
    }, [RefPaiement])

    const handleChange = e => {
        setmethode(e.target.value)
        if(methode === "Espèce"){
            setBnq('')
            setCheque('')
        }
    }


    const updateCotisation = () => {
        if(mois !== "" ){
            if(methode === "Espèce"){
                const datasend = {mois : mois, montant : mois * 200, methode : methode}
                axios.put(`http://localhost:5001/cotisations/edit/${RefPaiement}`, datasend)
                .then((resolve) => {
                    if(resolve.data.affectedRows !== 0){
                        toast.success("La Cotisation est Modifiée avec Succès")
                        props.history.push('/cotisations')
                    }
                    else{
                        toast.warning("Cette Cotisation est Introuvable")
                        props.history.push('/home')
                    }
                })
                .catch((err) => console.log(err))
            }
            else{
                if(bnq !== "" && cheque !== ""){
                    const datasend = {mois : mois, montant : mois * 200, methode : methode, cheque : cheque, bnq : bnq}
                    axios.put(`http://localhost:5001/cotisations/edit/${RefPaiement}`, datasend)
                    .then((resolve) => {
                        if(resolve.data.affectedRows !== 0){
                            toast.success("La Cotisation est Modifiée avec Succès")
                            props.history.push('/cotisations')
                        }
                        else if(resolve.data === "Introuvable"){
                            toast.error("Cette Cotisation est Introuvable")
                            props.history.push('/home')
                        }
                        else if(resolve.data.affectedRows === 0){
                            toast.warning("Cette Cotisation est Introuvable")
                        }
                    })
                    .catch((err) => console.log(err))
                }
            }
        }
        setOpen(false)
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            {
                msg === "data" && 
                <div className="card">
                    <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Modifier Une Cotisation</h4></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6"><Typography>Réf Paiement : <strong>{RefPaiement}</strong></Typography></div>
                            <div className="col-md-6"><Typography>Logement : <strong>{cotisation.RefLogement}</strong></Typography></div>
                        </div><br/>
                        <div className="row">
                            <Typography>Nom et Prénom : <strong> {cotisation.NomCompte} {cotisation.PrenomCompte} </strong> </Typography>
                        </div><br/>
                        <div className="row">
                            <div className="col-md-6"><Typography>Montant : <strong style={{color : "blue"}}>{cotisation.Montant}</strong>  (en MAD)</Typography></div>
                            <div className="col-md-6"><Typography>Nombre de Mois : <strong> {cotisation.NbrMois} Mois</strong></Typography> </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-md-6"><Typography>Méthode de Paiement : <strong>{cotisation.MethodePaiement}</strong></Typography></div>
                            <div className="col-md-6"><Typography>Date Paiement : <strong>{cotisation.datePaiement.replace("T23:00:00.000Z", "")}</strong></Typography></div>
                        </div>
                        {
                            cotisation.NumeroCheque !== null &&
                            <div className="row">
                                <div className="col-md-6"><Typography>Numéro de Chèque : <strong>{cotisation.NumeroCheque}</strong></Typography></div>
                                <div className="col-md-6"><Typography>Banque : <strong>{cotisation.Banque}</strong></Typography></div><br/>
                            </div>
                        }
                        <br/>
                        <div className="row">
                            <div className="col-md-6"><Typography>Du : <strong>{cotisation.Du.replace("T23:00:00.000Z", "")}</strong></Typography></div>
                            <div className="col-md-6"><Typography>Au : <strong>{cotisation.Au.replace("T23:00:00.000Z", "")}</strong></Typography></div>
                        </div><br/>
                        <div className="dropdown-divider"></div><br/>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField className={classes.textField} InputLabelProps={{ shrink: true,}} id="Nombre de Mois" label="Nombre de Mois" type="number" defaultValue="1" onChange={e => setMois(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label style={{paddingTop : "20px"}}> Montant TTC : <strong style={{color : "blue", fontSize : "20px"}}> { 200 * mois } Dhs</strong></label>
                            </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-md-12">
                                <FormControl className={classes.combo}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">Méthode de Paiement</InputLabel>
                                    <Select className={classes.selectEmpty} id="Méthode de Paiement" label="Méthode de Paiement" defaultValue={"Espèce"} defaultChecked={"Espèce"} onChange={handleChange}>
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
                                </div>
                            </div>
                        }
                        <br/> 
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-md-6">
                                <Link to="/cotisations" className="btn btn-outline-danger form-control">Annuler</Link>
                            </div>
                            <div className="col-md-6">
                                <input type="submit" value="Valider" onClick={handleOpen} className="btn btn-primary form-control" />
                            </div>
                        </div>
                    </div>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la mise à jour du cette Cotisaation ?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Confirmez-vous la modification du cette Cotisation ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={updateCotisation}  color="secondary" autoFocus>Oui, Je Confirme !</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
            <br/><br/><br/><br/><br/>
        </div>
    )
}

export default EditCotisation
