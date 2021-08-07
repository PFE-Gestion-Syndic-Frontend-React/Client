import React, { useEffect, useState } from 'react'
import { Paper, Grow, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, CardActions} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
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
        width: '921px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
    paper : {
        margin : "20px",
    },
    textfield : {
        width : "750px",
    },
}))


function ListerMesPaiements() {
    const History = useHistory()
    const classes = useStyles()
    const [msg, setMsg] = useState('')
    const [cotisations, setCotisation] = useState([])
    const [search, setSearch] = useState('')
    const id = localStorage.getItem('id')


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

        if(id !== undefined && id !== ""){
            if(search !== ""){
                axios.get(`/cotisations/mesCotisations/${id}/${search}`)
                .then((response) => {
                    if(response.data === "No Token at all" || response.data === "Invalid Token"){
                        localStorage.clear()
                        History.push('/')
                    }
                    else if(response.data === "No Cotisation"){
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                    else if(response.data.length !== 0){
                        setCotisation(response.data)
                        setMsg("")
                    }
                    else{
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                })
                .catch((err) => { console.log(err) })
            }
            else{
                axios.get(`/cotisations/mesCotisations/${id}`)
                .then((response) => {
                    console.log(response.data)
                    if(response.data === "No Token at all" || response.data === "Invalid Token"){
                        localStorage.clear()
                        History.push('/')
                    }
                    else if(response.data === "No Cotisation"){
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                    else if(response.data.length !== 0){
                        setCotisation(response.data)
                        setMsg("")
                    }
                    else{
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                })
                .catch(() => {})
            }
        }
        else{
            console.log("HEHO ANY ID !")
        }
    },[search, id, History])



    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Cotisations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Cotisations..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/>
                </div><br/>
            </div><br/>
            <div className="container col-md-8 col-md-offset-2">
                {
                    msg === "" &&
                    <div className="">
                        {
                            cotisations.map((c) => {
                                return(
                                    <Grow key={c.RefPaiement} in={useEffect} timeout={1000}> 
                                        <Paper elevation={4} className={classes.paper}>
                                            <Accordion className="mb-5 card">
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                    <Typography className={classes.heading}> <h5 style={{color : "blue"}}><strong> Cotisation du {c.datePaiement && c.datePaiement.replace("T23:00:00.000Z", "")} </strong></h5>  </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={classes.root} elevation={1}>
                                                            <CardContent>
                                                                <Typography variant="body1" color="textPrimary">
                                                                    <div className="row text-muted"><strong>Logement :  {c.RefLogement} </strong></div>
                                                                    <div className="row" >
                                                                        <div className="col-md-6"> Méthode de Paiement : {c.MethodePaiement} </div>
                                                                        <div className="col-md-6"> Montant à Payer : <strong style={{color : "blue"}}> {c.Montant} (en MAD) X {c.NbrMois} Mois</strong></div><br/>
                                                                    </div>
                                                                    {
                                                                        c.MethodePaiement === "Chèque" && 
                                                                        <div className="row">
                                                                            <div className="col-md-6">Numéro du Chèque : <strong>{c.NumeroCheque}</strong></div>
                                                                            <div className="col-md-6">Banque : <strong>{c.Banque}</strong>  </div><br/>
                                                                        </div>
                                                                    }
                                                                    <div className="row">
                                                                        <div className="col-md-6">Du : <strong>{c.Du && c.Du.replace("T23:00:00.000Z", "")}</strong></div>
                                                                        <div className="col-md-6">Au : <strong>{c.Au && c.Au.replace("T23:00:00.000Z", "")}</strong></div>
                                                                    </div>
                                                                </Typography>
                                                            </CardContent>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <CardActions><Typography variant="body2" color="textSecondary" style={{marginLeft : "7px"}}>Déclarer Par : {c.NomCompte} {c.PrenomCompte}</Typography></CardActions>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <CardActions><Typography variant="body2" color="textSecondary">Date Paiement : {c.datePaiement && c.datePaiement.replace("T23:00:00.000Z", "")}</Typography></CardActions>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Paper>
                                    </Grow>
                                )
                            })
                        }
                    </div>
                }
                {
                    search === "" ?
                    <div>{ msg === "No Cotisation" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}> Vous n'avez Aucune Cotisation Pour l'Instant </strong></Alert></div> }</div>
                    :
                    <div>{msg === "No Cotisation" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Cotisation Pour Cette Recherche "{search}" </strong></Alert></div> }</div>
                }
            </div>
        </div>
    )
}

export default ListerMesPaiements
