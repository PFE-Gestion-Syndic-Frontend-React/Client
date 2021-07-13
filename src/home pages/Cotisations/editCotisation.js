import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core'
import axios from 'axios'
import {makeStyles} from '@material-ui/core/styles'



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
  }));


function EditCotisation(props) {
    const classes = useStyle()
    const RefPaiement = props.match.params.RefPaiement
    const [open, setOpen] = useState(false)
    const [cotisation, setCotisation] = useState('')
    const [msg, setMsg] = useState('')
    const [mois, setMois] = useState('')
    //const [Au, setAu] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
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




    const updateCotisation = () => {

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
                            <div className="col-md-6" style={{marginTop : "22px"}}><Typography>Montant : <strong style={{color : "blue"}}>{mois !== '' ? 200 * mois : cotisation.Montant}</strong>  (en MAD)</Typography></div>
                            <div className="col-md-6"><TextField InputLabelProps={{ shrink: true,}} id="standard-basic" type="number" label="Nombre de Mois Payer" className={classes.root} required defaultValue={cotisation.NbrMois} onChange={e => setMois(e.target.value)} /><small className="text-muted">(Mois)</small> </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-md-6"><Typography>Méthode de Paiement : <strong>{cotisation.MethodePaiement}</strong></Typography></div>
                            <div className="col-md-6"><Typography>Date Paiement : <strong>{cotisation.datePaiement.replace("T23:00:00.000Z", "")}</strong></Typography></div>
                        </div><br/>
                        {
                            cotisation.NumeroCheque !== null &&
                            <div className="row">
                                <div className="col-md-6"><Typography>Numéro de Chèque : <strong>{cotisation.Numerocheque}</strong></Typography></div>
                                <div className="col-md-6"><Typography>Banque : <strong>{cotisation.Banque}</strong></Typography></div><br/>
                            </div>
                        }
                        <div className="row"><br/>
                            <div className="col-md-6"><Typography>Du : <strong>{cotisation.Du.replace("T23:00:00.000Z", "")}</strong></Typography></div>
                            <div className="col-md-6"><Typography>Au : <strong>{mois !== '' ? "Loading..": cotisation.Au.replace("T23:00:00.000Z", "")}</strong></Typography></div>
                        </div><br/>
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
        </div>
    )
}

export default EditCotisation
