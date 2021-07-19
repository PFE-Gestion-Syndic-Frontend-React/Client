import React, { useState, useEffect } from 'react'
import { Grow, Paper, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Avatar, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { DeleteOutlined, UpdateOutlined, CloudDownloadOutlined } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import GuestVerify from '../../utils/guestVerify'

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


const useStyles = makeStyles((theme) => ({
    root: {
        width: '915px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
    textfield : {
        width : "720px",
    },
    paper : {
        margin : "20px",
    },
}))



function ListeReclamation(props) {
    const history = useHistory()
    const classes = useStyles()
    const [reclamations, setreclamation] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [RefRecl, setRefRecl] = useState('')
    const [deleted, setDeleted] = useState('')
    const id = localStorage.getItem('id')



    const handleClickOpen = (RefReclamation) => {
        setOpen(true)
        setRefRecl(RefReclamation)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const deleteReclamation = (RefReclamation) => {
        if(RefReclamation !== ""){
            axios.delete("http://localhost:5001/reclamations/delete/" + RefReclamation)
            .then((resolve) => {
                if(resolve.data  === "No Réclamation"){
                    toast.error("La Suppression est échouée car la réclamation est INTROUVABLE !")
                }
                else if(resolve.data === "Deleted"){
                    toast.info("La Réclamation est Supprimée avec Succès")
                }
                setMsg('')
                setDeleted('yes')
            })
            .catch(() => {})
        }
        setOpen(false)
    }



    useEffect(() => {
        GuestVerify()
        if(search !== ""){
            axios.get("http://localhost:5001/reclamations/cops/all/" + id + "/" + search)
            .then((response) => {
                if(response.data === "No Réclamation"){
                    setMsg("No Réclamation")
                    setreclamation([])
                }
                else if(response.data.length > 0){
                    setreclamation(response.data)
                    setMsg("")
                }
                else {
                    setreclamation([])
                    setMsg("No Réclamation")
                }
            })
            .catch(() => {

            })
        }
        else{
            axios.get("http://localhost:5001/reclamations/cops/all/" + id)
            .then((response) => {
                if(response.data === "No Réclamation"){
                    setMsg("No Réclamation")
                    setreclamation([])
                }
                else if(response.data.length > 0){
                    setreclamation(response.data[0])
                    setMsg("")
                }
                else{
                    setreclamation([])
                    setMsg("No Réclamation")
                }
            })
            .catch(() => {})
        }
        setDeleted('')
    }, [search, id, deleted])


    const handleUpdateRecla = (refReclamation) => {
        history.push('/réclamation/edit/' + refReclamation)
    }

    const handleDownload = (contenu) => {

    }

    return (
        <div style={{top : "90px", paddingTop : "40px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Réclamations de la Résidence </h1><br/><br/>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Réclamations..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div>
            </div><br/><br/>
            {
                msg === "" && 
                <div className="container col-md-8 col-md-offset-2">
                    {
                        reclamations.length !== 0 &&
                        reclamations.map((r) => {
                            return(
                                <Grow key={r.RefReclamation} in={useEffect} timeout={1000}>
                                    <Paper elevation={4} className={classes.paper}>
                                        <Accordion className="mb-5 card">
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                <Typography className={classes.heading}> <h5 style={{color : "blue"}}><strong> {r.Objet} </strong></h5>  </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography spacing={3}>
                                                    <Card className={classes.root} elevation={1}>
                                                        <CardHeader action={ r.NumCompte === parseInt(id) ? <div><IconButton onClick={ handleUpdateRecla.bind(this, r.RefReclamation)}><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton><IconButton onClick={ handleClickOpen.bind(this, r.RefReclamation) }><DeleteOutlined style={{color : "red", fontSize : "30px"}} /> </IconButton> </div> : <div></div> } /> 
                                                        <CardContent>
                                                            <div className="row">
                                                                <div className="col-md-6"><Typography variant="inherit" color="textPrimary" style={{color : "silver"}}> Publier par : {r.NomCompte} {r.PrenomCompte} </Typography></div>
                                                                <div className="col-md-6"><Typography variant="inherit" color="textPrimary" style={{color : "silver"}}> l'Etat du Réclamation : {r.statut} </Typography></div>
                                                            </div>
                                                        </CardContent>
                                                        <CardContent>
                                                            <Typography variant="body1" color="textPrimary">
                                                                {r.Message}
                                                            </Typography><br/>
                                                            {
                                                                r.contenu !== null && 
                                                                <div className="overflow">
                                                                    <Avatar className="scaleImg" src={"reclamation support/" + r.contenu} alt={""} style={{width : "200px", height : "200px"}} />
                                                                    <div style={{marginLeft : "60px"}}><IconButton aria-label="Download" aria-labelledby="Download" onClick={handleDownload.bind(this, r.contenu)} ><CloudDownloadOutlined style={{width : "50px", height : "50px"}}/></IconButton></div>
                                                                </div>
                                                            }
                                                        </CardContent><br/>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <CardActions><Typography variant="body2" color="textSecondary"> Cette Réclamation est : {r.pour} </Typography></CardActions>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <CardActions><Typography variant="body2" color="textSecondary"> Date Publication : {r.dateReclamation && r.dateReclamation.replace("T23:00:00.000Z", "")} </Typography></CardActions>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Paper>
                                </Grow>
                            )}
                        )
                    }
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la Suppression d'une Réclamation ?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Est ce que Voulez-Vous de SUPPRIMER Cette Réclamation ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={deleteReclamation.bind(this, RefRecl)} color="secondary" autoFocus>Oui, Je Supprime !</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
            {
                msg === "No Réclamation" &&
                <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucune Réclamation pour cette Recherche "{search}" </Alert></div>
            }<br/><br/><br/><br/><br/>
        </div>
    )
}

export default ListeReclamation
