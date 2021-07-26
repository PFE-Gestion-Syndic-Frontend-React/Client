import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText} from '@material-ui/core';
import axios from 'axios';
import { toast } from 'react-toastify'



const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      
      marginRight: theme.spacing(1),
      textAlign : 'center',
      width: "100%",
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 320,
        },
    },
  }));

function EditDepense(props) {
    const History = useHistory()
    const classes = useStyles()
    const [montant, setMontant] = useState('')
    const [fac, setFac] = useState('')
    const [desc, setDesc] = useState('')
    const [dep, setDep] = useState({})
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const refDepense = props.match.params.refDepense

    if(msg){}

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
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

        if(refDepense){
            axios.get(`/depenses/depense/${refDepense}`)
            .then(res => 
                {
                    if(res.data.msgErr === "Not Found"){
                        setDep({})
                        toast.warn("Aucune Dépense pour cette Recherche !")
                    }
                    else if(res.data.length > 0){
                        setDep(res.data[0])
                    }
                })
                .catch(() => console.log("Cannot Read Data"))
        }
    },[refDepense, History])

    const updateDepense = () => {
        if(montant !== "" && fac !== "" && desc !== ""){
            const datasend = {montant : montant, fac : fac, desc : desc}
            console.log(datasend)
            axios.put(`/depenses/edit/${refDepense}`, datasend)
            .then((resolve) => {
                if(resolve.data.message === "Updated Successfully"){
                    setMsg("Updated Successfully")
                    props.history.push('/dépenses')
                    toast.success("La Dépense est modifiée avec Succès")
                }
            })
            .catch(() => {
                 
            })
        }
        else{
            setMsg("Champs Obligatoires")
            toast.warn("Les Champs qui ont (*) sont Obligatoires")
        }
        setOpen(false)
    }


    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-cash"></i> Modifier Une Dépense</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Nom et Prénom : <strong> {dep.NomCompte} {dep.PrenomCompte} </strong></label>
                        </div>
                        <div className="col-md-6">
                            <label>Fonction : <strong> {dep.fonc} </strong></label>
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Catégorie : <strong> {dep.NomCategorie} </strong></label>
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField multiline={true} InputLabelProps={{ shrink: true,}} id="standard-basic" label="Montant du Dépense (en MAD)" className={classes.container} defaultValue={dep.MontantDepense} onChange={e => setMontant(e.target.value)}></TextField>
                        </div>
                        <div className="col-md-6">
                            <TextField multiline={true} InputLabelProps={{ shrink: true,}} id="standard-basic" label="Facture ou Bon du Dépense" className={classes.container} defaultValue={dep.facture} onChange={e => setFac(e.target.value)} />
                        </div>
                    </div><br/><br />
                    <div className="row">
                        <div className="col-md-12">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Description de la Dépense" multiline={true} className={classes.textField} defaultValue={dep.descriptionDepense} onChange={e => setDesc(e.target.value)} />
                        </div>
                    </div><br/>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/dépenses" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Partager" onClick={handleOpen} className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la mise à jour du cette Dépense ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Confirmez-vous la modification du cette Dépense ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={updateDepense}  color="secondary" autoFocus>Oui, Je Confirme !</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditDepense
