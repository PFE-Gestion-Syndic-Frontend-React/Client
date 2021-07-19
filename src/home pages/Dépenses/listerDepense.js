import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Paper, Grow, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Accordion, AccordionSummary, Typography, AccordionDetails, Card, CardHeader, CardContent, CardActions, IconButton} from '@material-ui/core'
import { UpdateOutlined, DeleteOutlined } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router'
import {toast} from 'react-toastify'
import Alert from '@material-ui/lab/Alert'
import Util from '../../utils/util'



const useStyles = makeStyles((theme) => ({
    alert :{
        flexDirection: 'column',
        width : "150vh",
        '& > *': {
            textAlign : 'center',
            alignItems: 'center',
        },
    },
    root: {
        width: '915px',
    },
    textfield : {
        width : "720px",
    },
    paper: {
        margin: "20px",
    },
}))


function ListerDepense(props) {
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [depense, setDepense] = useState([]) 
    const [msg, setMsg] = useState('')
    const [deleted, setDeleted] = useState('')
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        Util()
        if(search !== ""){
            axios.get("http://localhost:5001/depenses/" + search)
            .then((response) => {
                if(response.data.msgErr === "No Token Set"){
                    localStorage.clear()
                    History.push('/')
                }
                else if(response.data === "No Dépense"){
                    setDepense([])
                    setMsg("No Dépense")
                }
                else if(response.data.length > 0){
                    setDepense(response.data)
                    setMsg("data")
                }
                else{
                    setDepense([])
                    setMsg("No Dépense")
                }
            })
            .catch(() => {})
        }
        else{
            axios.get("http://localhost:5001/depenses/all")
            .then((response) => {
                if(response.data){
                    if(response.data === "No Dépense"){
                        setDepense([])
                        setMsg("No Dépense")
                    }
                    else if(response.data.length > 0){
                        setDepense(response.data)
                        setMsg("data")
                    }
                    else {
                        setDepense([])
                        setMsg("No Dépense")
                    }
                }
            })
            .catch(() => {})
        }
    }, [search, msg, deleted])

    const deleteDepense = (RefDepense) => {
        axios.delete(`http://localhost:5001/depenses/delete/${RefDepense}`)
        .then((resolve) => {
            toast.info("La Dépense a été Supprimée avec Succès")
        })
        .catch(() => {
            
        })
        toast.info("La Dépense a été Supprimée avec Succès")
        setMsg("")
        setDeleted("ok")
        setOpen(false)
    }

    const history = useHistory()
    const updateDepense = (RefDepense) => {
        return(
            history.push(`/dépense/edit/${RefDepense}`)
        )
    }


    return (
        <div style={{top : "120px"}}><br/>
            <h1 style={{marginLeft : "200px"}}>Lister Les Dépenses</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Dépenses..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div><br/>
            </div>
            {
                msg === "data" &&
                <div className="container col-md-8 col-md-offset-2">    
                    {
                        depense.map((d) => {
                            return(
                                <Grow key={d.RefDepense} in={useEffect} timeout={1000}>
                                    <Paper elevation={4} className={classes.paper}>
                                        <div >
                                            <Accordion key={d.RefDepense} className="mb-5 card">
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                    <Typography className={classes.heading} style={{color : "blue"}}><strong> {d.descriptionDepense} </strong></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={ classes.root}>
                                                            <CardHeader action={ <div> <IconButton onClick={ updateDepense.bind(this, d.RefDepense)} ><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton><IconButton onClick={handleOpen}><DeleteOutlined style={{color : "red", fontSize : "30px"}} /></IconButton></div> } />
                                                            <CardContent>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <Typography variant="body1" color="textPrimary">La Categorie : <strong>{d.NomCategorie}</strong> </Typography>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <Typography variant="body1" color="textPrimary">Montant : <strong style={{color : "blue"}}>{d.MontantDepense} (en Dhs)</strong></Typography>
                                                                    </div>
                                                                </div><br/>
                                                                <Typography > Facture : {"d.facture"} </Typography>
                                                            </CardContent>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <CardActions><Typography variant="body2" color="textSecondary"> Déclarer par : {d.NomCompte} {d.PrenomCompte} </Typography></CardActions>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <CardActions><Typography variant="body2" color="textSecondary">  Date mise à jour : {d.dateDepense && d.dateDepense.replace("T23:00:00.000Z", "")} </Typography></CardActions>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                                <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la suppression d'une Dépense ?"}</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Confirmez-vous la SUPPRESSION du cette Dépense ?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose} color="primary">Cancel</Button>
                                                    <Button onClick={deleteDepense.bind(this, d.RefDepense)}  color="secondary" autoFocus>Oui, Je Confirme !</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Paper>
                                </Grow>
                            )
                        })
                    }
                </div>
            }
            {
                search !== "" ?
                <div>{ msg === "No Dépense" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucune Dépense Pour Cette Recherche "{search}"</Alert></div> }</div>
                :
                <div>{ msg === "No Dépense" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucune Dépense Pour l'Instant</Alert></div> }</div>
            }
            
        </div>
    )
}

export default ListerDepense
