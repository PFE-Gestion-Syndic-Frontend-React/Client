import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Avatar, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { DeleteOutlined, UpdateOutlined } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import { useHistory } from 'react-router'

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
        width: '955px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
    textfield : {
        width : "720px",
    },
}))



function ListeReclamation() {
    const history = useHistory()
    const classes = useStyles()
    const [reclamations, setreclamation] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [RefRecl, setRefRecl] = useState('')
    const id = localStorage.getItem('id')



    const handleClickOpen = (RefReclamation) => {
        setOpen(true)
        setRefRecl(RefReclamation)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const deleteReclamation = (RefReclamation) => {
        console.log("Delete : ", RefReclamation)
        setOpen(false)
    }

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/reclamations/cops/all/" + id + "/" + search)
            .then((response) => {
                if(response.data.msggg === "No Réclamation"){
                    setMsg("No Réclamation")
                    setreclamation("")
                }
                else if(response.data === "Failed to load Data"){
                    setMsg("No Réclamation")
                }
                else if(response.data.length > 0){
                    setreclamation(response.data)
                    setMsg("")
                }
                else {
                    setreclamation("")
                    setMsg("No Réclamation")
                }
            })
            .catch(() => {

            })
        }
        else{
            axios.get("http://localhost:5001/reclamations/cops/all/" + id)
                .then((response) => {
                    if(response.data.length > 0){
                        setreclamation(response.data[0])
                        setMsg("")
                    }
                })
                .catch(() => setMsg("No Réclamation"))
        }
    }, [search, id])


    const handleUpdateRecla = (RefReclamation) => {
        history.push('/réclamation/edit/' + RefReclamation)
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
                        reclamations.map((r) => {
                            return(
                                <div>
                                    <Accordion key={r.RefReclamation} className="mb-5">
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
                                                            <div>
                                                                <Avatar src={"reclamation support/" + r.contenu} alt={""} style={{width : "200px", height : "200px"}} />
                                                            </div>
                                                        }
                                                    </CardContent><br/>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <CardActions><Typography variant="body2" color="textSecondary"> Cette Réclamation est : {r.pour} </Typography></CardActions>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <CardActions><Typography variant="body2" color="textSecondary"> Date Publication : {r.dateReclamation.replace("T23:00:00.000Z", "")} </Typography></CardActions>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                        <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la Suppression d'une Annonce ?"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Est ce que Voulez-Vous de SUPPRIMER Cette Annonce ?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">Cancel</Button>
                                            <Button onClick={deleteReclamation.bind(this, RefRecl)} color="secondary" autoFocus>Oui, Je Supprime !</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            )}
                        )
                    }
                </div>
            }
            {
                msg === "No Réclamation" &&
                <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucune Réclamation pour cette Recherche "{search}" </Alert></div>
            }
        </div>
    )
}

export default ListeReclamation
