import React, { useEffect, useState } from 'react'
import { Grow, Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteOutlined, UpdateOutlined }from '@material-ui/icons';
import axios from 'axios';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify'



const useStyles = makeStyles((theme) => ({
    alert :{
        flexDirection: 'column',
        width : "150vh",
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom : theme.spacing(5),
            marginLeft : theme.spacing(51),
            marginRight : theme.spacing(5),
            textAlign : 'center',
            alignItems: 'center',
        },
    },
    root: {
        width: '962px',
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



function ListerCotisation() {
    const classes = useStyles()
    const History = useHistory()
    const [msg, setMsg] = useState('')
    const [cotisations, setCotisation] = useState([])
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [deleted, setDeleted] = useState('')
    const [paied, setPaied] = useState('')
    const [periode, setPeriode] = useState(0)

    const handleOpen = (RefPaye) => {
        setOpen(true)
        setPaied(RefPaye)
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

        if(periode === 0){
            if(search !== ""){
                const run = axios.get("/cotisations/" + search)
                .then((response) => {
                    if(response.data === "No Paiements"){
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                    else if(response.data.length > 0){
                        setCotisation(response.data)
                        setMsg("")
                    }
                    else{
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                })
                .catch((err) => {})
    
                return (() => clearInterval(run))
            }
            else{
                const run1 = axios.get("/cotisations/all")
                .then((response) => {
                    if(response.data.length > 0){
                        setCotisation(response.data[0])
                        setMsg("")
                    }
                    else{
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                })
                .catch(() => {})
                setDeleted('')
                return (() => clearInterval(run1))
            }
        }
        else if(periode === 1 || periode === 3 || periode === 6){
            const datasend = { perd : periode }
            const run3 = axios.post("/cotisations/periode", datasend)
            .then((response) => {
                if(response.data.length > 0){
                    setCotisation(response.data)
                    setMsg("")
                }
                else if(response.data.msgErr === "No Paiements"){
                    setCotisation([])
                    setMsg("No Cotisation")
                }
                else{
                    setCotisation([])
                    setMsg("No Cotisation")
                }
            })
            .catch(() => {})

            return (() => clearInterval(run3))
        }
    },[search, deleted, msg, paied, History, periode])

    const updateCotisation = (RefCotisation) => {
        History.push('/cotisation/edit/' + RefCotisation)
    }

    const deleteCotisation = () => {
        axios.delete("/cotisations/delete/" + paied)
        .then((response) => {
            if(response.data  === "No Cotisation"){
                toast.error("La Suppression est ??chou??e car la Cotisation est INTROUVABLE !")
            }
            else if(response.data === "Deleted"){
                toast.info("La Cotisation est Supprim??e avec Succ??s")
            }
        })
        .catch(() => {})
        setMsg('')
        setDeleted('OK')
        setOpen(false)
    }

    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Cotisations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Cotisations..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <FormControl className={classes.formControl} style={{width : "100%"}}>
                                <InputLabel InputLabelProps={{ shrink: true,}} id="demo-simple-select-label">Consulter Par P??riode</InputLabel>
                                <Select style={{width : "100%"}} onChange={e => setPeriode(e.target.value)} displayEmpty className={classes.selectEmpty} defaultChecked={"Toutes Les Cotisations"} defaultValue={0}>  
                                    <MenuItem value={0}>Toutes Les Cotisations</MenuItem>  
                                    <MenuItem value={1}>Le Mois Courant</MenuItem>    
                                    <MenuItem value={3}>Les 3 Mois Pr??cidents</MenuItem>
                                    <MenuItem value={6}>Les 6 Mois Pr??cidents</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div><br/><br/>
            </div>
            <div className="container col-md-8 col-md-offset-2">
                {
                    msg === "" &&
                    <div>
                        {
                            cotisations.map((c) => {
                                return(
                                    <Grow key={c.RefPaiement} in={useEffect} timeout={1000}>
                                        <Paper elevation={4} className={classes.paper}>
                                            <div>
                                                <Accordion className="mb-5 card">
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                        <Typography className={classes.heading}> <strong style={{fontSize : "20px"}}><span style={{color : "blue"}}>{c.NomCompte} {c.PrenomCompte}</span><span style={{}}> Le : {c.datePaiement.replace("T23:00:00.000Z", "")}</span></strong></Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography spacing={3}>
                                                            <Card className={classes.root} elevation={1}>
                                                                <CardHeader action={ <div> <IconButton onClick={ updateCotisation.bind(this, c.RefPaiement) }  ><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton><IconButton onClick={ handleOpen.bind(this, c.RefPaiement) }><DeleteOutlined style={{color : "red", fontSize : "30px"}} /> </IconButton> </div> } 
                                                                            subheader={`R??f??rence du Paiement :  ${c.RefPaiement}`} />
                                                                <CardContent>
                                                                    <Typography variant="body1" color="textPrimary">
                                                                        <div className="text-muted">Libell?? du Logement : <strong>{c.RefLogement}</strong> </div>
                                                                        <div className="row" >
                                                                            <div className="col-md-6"> M??thode de Paiement : {c.MethodePaiement} </div>
                                                                            <div className="col-md-6"> Montant ?? Payer : <strong style={{color : "blue"}}> {c.Montant} (en MAD) X {c.NbrMois} Mois  </strong></div><br/>
                                                                        </div>
                                                                        {
                                                                            c.MethodePaiement === "Ch??que" && 
                                                                            <div className="row">
                                                                                <div className="col-md-6">Num??ro du Ch??que : <strong>{c.NumeroCheque}</strong>  </div>
                                                                                <div className="col-md-6">Banque : <strong>{c.Banque}</strong>  </div><br/>
                                                                            </div>
                                                                        }
                                                                        <div className="row">
                                                                            <div className="col-md-6">Du : <strong>{c.Du && c.Du.replace("T23:00:00.000Z", "")} </strong>  </div>
                                                                            <div className="col-md-6">Au : <strong>{c.Au && c.Au.replace("T23:00:00.000Z", "")}</strong>  </div>
                                                                        </div>
                                                                    </Typography>
                                                                </CardContent>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <CardActions><Typography variant="body2" color="textSecondary" style={{marginLeft : "7px"}}>D??clarer Par : {c.NomAdmin} {c.PrenomAdmin}</Typography></CardActions>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <CardActions><Typography variant="body2" color="textSecondary"> Date Paiement : {c.datePaiement && c.datePaiement.replace("T23:00:00.000Z", "")} </Typography></CardActions>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>
                                        </Paper>
                                    </Grow>
                                )
                            })
                        }
                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la Suppression d'une Cotisation ?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description" color="error">
                                    <strong> Est ce que Vous ??tes s??r de SUPPRIMER Cette Cotisation ?</strong>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">Cancel</Button>
                                <Button onClick={deleteCotisation.bind(this, paied)} color="secondary" autoFocus>Oui, Je Supprime !</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
                {
                    search !== "" ?
                    <div>{ msg === "No Cotisation" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Cotisation Pour Cette Recherche "{search}"</strong></Alert></div> }</div>
                    :
                    <div>{ msg === "No Cotisation" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Cotisation Pour l'Instant</strong></Alert></div> }</div>
                }
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default ListerCotisation
