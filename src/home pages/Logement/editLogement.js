import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Select, MenuItem, FormControl, InputLabel, Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'



const useStyles = makeStyles((theme) => ({
    
    root: {
        width: '955px',
    },
}))


function EditLogement(props) {
    const History = useHistory()
    const classes = useStyles()
    const [copro, setCopro] = useState([])
    const refLogement = props.match.params.refLogement
    const [compte, setCompte] = useState([])
    const [msg, setMsg] = useState('')
    const [num, setNum] = useState('')
    const [open, setOpen] =useState(false)
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        if(num !== "" && refLogement !== ""){
            setOpen(true)
        }
        else{
            setOpen(false)
            toast.warn("Merci de Séléctionner le Copropriétaire à partir la liste déroulante !")
        }
    };

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

        if(refLogement !== ""){
            axios.get("/logements/coproprietaire/" + refLogement)
            .then((resolve) => {
                if(resolve.data.length > 0){
                    setCopro(resolve.data[0])
                }
            })
            .catch(() => {
    
            })
            setOpen(false)
        }
   
        axios.get("/logements/Coproprietaire/byEmail")
        .then((response) => {
            if(response.data.length > 0){
                setCompte(response.data)
                //console.log(compte)
                setMsg("Founded")
            }
            else {
                setMsg("No Users")
                setCompte(response.data.msggg)
                console.log("No User")
                toast.warn("Invalid Copropriétaire")
            }
        })
        .catch(() => {})
    }, [refLogement, History])


    const updateLog = () => {
        if(num !== "" && refLogement !== ""){
            axios.put("/logements/edit/" + refLogement, {num : num})
            .then((resolve) => {
                if(resolve.data.message === "Inserted"){
                    props.history.push('/logement')
                    toast.success("Le Logement est modifié avec Succès")
                }
            })
            .catch((err) => {
                console.log(err)
            })
            setOpen(false)
        }
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "7%"}}>
            <Card key={copro.NumCompte} className={classes}>
                <CardHeader subheader={`Réf Logement : ${refLogement}`} />
                <CardContent>
                    <Typography variant="body1" color="textPrimary">Le Copropriétaire : <strong> {copro.NomCompte} {copro.PrenomCompte} </strong> </Typography>
                    <Typography>l'Email du Copropriétaire : <strong> {copro.EmailCompte} </strong></Typography>
                    <Typography>Le Numéro du Téléphone : <strong> {copro.telephone} </strong></Typography><br/>
                    <div>
                        <FormControl required InputLabelProps={{ shrink: true,}}  id="standard-basic" label="l'Adresse E-mail du Copropriétaire" className={classes.textField} style={{width : "100%"}} >
                            <InputLabel shrink id="demo-simple-select-placeholder-label-label">Le Nouveau Copropriétaire</InputLabel>
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
                </CardContent>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/logement" className="form-control btn btn-outline-danger">Annuler</Link>
                    </div>
                    <div className="col-md-6">
                        <input type="submit" value="Confirmer" onClick={handleClickOpen} className="form-control btn btn-primary" />
                    </div>
                </div>
            </Card>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation d'affectation d'un Copropriétaire à un Logement ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Est ce que vous etes sure de mettre cette modification !
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={updateLog} color="secondary" autoFocus>Oui, Je Confirme !</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditLogement
