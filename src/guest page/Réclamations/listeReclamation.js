import React, { useState, useEffect } from 'react'
import { Grow, Paper, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import { DeleteOutlined, UpdateOutlined } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import axios from 'axios'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'

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
    const History = useHistory()
    const classes = useStyles()
    const [reclamations, setreclamation] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [RefRecl, setRefRecl] = useState('')
    const [deleted, setDeleted] = useState('')
    const id = localStorage.getItem('id')
    const [periode, setPeriode] = useState(0)


    const handleClickOpen = (RefReclamation) => {
        setOpen(true)
        setRefRecl(RefReclamation)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const deleteReclamation = (RefReclamation) => {
        if(RefReclamation !== ""){
            axios.delete("/reclamations/delete/" + RefReclamation)
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
        axios.get("/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve.data.role === "Copropriétaire"){

            }
            else if(resolve.data.role !== "Copropriétaire"){
                localStorage.clear()
                History.push('/')
            }
            else if(resolve.data.msg === "Incorrect token !"){
                console.log("Incorrect Token")
                localStorage.clear()
                History.push('/')
            }
            else{ //added
                localStorage.clear()
                History.push('/')
            }
        })
        .catch(() => {})

        if(periode === 0){
            if(search !== ""){
                const run1 = axios.get("/reclamations/cops/all/" + id + "/" + search)
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
                .catch(() => {})

                return (() => clearInterval(run1))
            }
            else{
                const run2 = axios.get("/reclamations/cops/all/" + id)
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

                return (() => clearInterval(run2))
            }
        }
        else if(periode === 1 || periode === 3 || periode === 6){
            const datasend = {perd : periode}
            const run3 = axios.post(`/reclamations/copro/all/periode/${id}`, datasend)
            .then((response) => {
                if(response.data === "No Réclamation"){
                    setMsg("No Réclamation")
                    setreclamation([])
                }
                else if(response.data.length > 0){
                    setreclamation(response.data)
                    setMsg("")
                }
                else{
                    setreclamation([])
                    setMsg("No Réclamation")
                }
            })
            .catch(() => {})
            return (() => clearInterval(run3))
        }
        setDeleted('')
    }, [search, id, deleted, History, periode])


    const handleUpdateRecla = (refReclamation) => {
        History.push('/réclamation/edit/' + refReclamation)
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
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <FormControl className={classes.formControl} style={{width : "100%"}}>
                                <InputLabel InputLabelProps={{ shrink: true,}} id="demo-simple-select-label">Consulter Par Période</InputLabel>
                                <Select style={{width : "100%"}} onChange={e => setPeriode(e.target.value)} displayEmpty className={classes.selectEmpty} defaultChecked={"Toutes Les Réclamations"} defaultValue={"0"}>  
                                    <MenuItem value={0}>Toutes Les Réclamations</MenuItem>  
                                    <MenuItem value={1}>Le Mois Courant</MenuItem>    
                                    <MenuItem value={3}>Les 3 Mois Précidents</MenuItem>
                                    <MenuItem value={6}>Les 6 Mois Précidents</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
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
                                                                    <img className="scaleImg" src={"reclamation support/" + r.contenu} alt={""} style={{width : "200px", height : "200px"}} />
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
                <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Réclamation pour cette Recherche "{search}"</strong></Alert></div>
            }<br/><br/><br/><br/><br/>
        </div>
    )
}

export default ListeReclamation
