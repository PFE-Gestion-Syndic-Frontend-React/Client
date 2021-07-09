import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, FormHelperText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    alert :{
        width : "100%",
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom : theme.spacing(5),
            textAlign : 'center',
        },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
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


function EditReclamation(props) {
    const classes = useStyles()
    const [etat, setEtat] = useState('')
    const [reclamation, setReclamation] = useState({})
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        if(etat !== ""){
            setOpen(true) 
        }
        else{
            setOpen(false)
            toast.warn("Merci de Séléctionner apartir la liste déroulante l'Etat du Réclamation !")
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    const refReclamation = props.match.params.refReclamation
    useEffect(() => {
        if(refReclamation !== ""){
            axios.get(`http://localhost:5001/reclamations/reclamation/${refReclamation}`)
            .then(res => 
            {
                if(res.data.msgErr === "Not Found"){
                    setReclamation({})
                }
                else{
                    setReclamation(res.data[0])
                }
            })
            .catch(() => console.log("Cannot Read Data"))
        }
    }, [refReclamation])


    const update = () => {
        const refReclamation = props.match.params.refReclamation
        if(etat !== null){
            const datasend = {etat : etat}
            axios.put(`http://localhost:5001/reclamations/edit/${refReclamation}`, datasend)
            .then((resolve) => {
                if(resolve.data.message === "Updated Successfully"){
                    setMsg("Updated Successfully")
                    props.history.push('/réclamations')
                    toast.success("La Réclamation est modifiée avec Succès")
                }
                else if(resolve.data.empty === "Champs Obligatoires !"){
                    setMsg("Champs Obligatoires")
                    toast.warn("Les Champs qui ont (*) sont Obligatoires")
                }
            })
            .catch(() => {
                 
            })
        }
    }
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card" key={reclamation.refReclamation} >
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-clipboard-check"></i> Modifier Une Réclamation </h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6"> RE : <strong> {reclamation.NomCompte} {reclamation.PrenomCompte} </strong></div>
                        <div className="col-md-6">Etat : <strong>{reclamation.statut}</strong></div>
                    </div><br/>
                    <div className="row">
                        <label>Objet : {reclamation.Objet} </label>
                    </div><br/>
                    <div className="row">
                        <label>Description : {reclamation.Message} </label>
                    </div><br />
                    <div className="row container">
                        <FormControl className={classes.formControl}>
                            <FormHelperText>Etat de Réclamation *</FormHelperText>
                            <Select style={{width : "100%"}} onChange={e => setEtat(e.target.value)} displayEmpty className={classes.selectEmpty} required inputProps={{ 'aria-label': 'Without label' }} >
                                <MenuItem value="" disabled> Etat de Réclamation </MenuItem>
                                <MenuItem value="En Cours">En Cours</MenuItem>
                                <MenuItem value="Résolue">Résolue</MenuItem>
                                <MenuItem value="Echoué">Echoué</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div><br/>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/réclamations" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Valider" onClick={handleClickOpen} className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Validation de la modification d'une Réclamation ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Est ce que Vous-etes sur à-propos cette Modification ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={update} color="secondary" autoFocus>Oui, Je Confirme !</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditReclamation
