import React, { useEffect, useState } from 'react'
import {Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, CardActions} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert'

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
        width: '962px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
}))


function ListerMesPaiements() {
    const classes = useStyles()
    const [msg, setMsg] = useState('')
    const [cotisations, setCotisation] = useState([])
    const [search, setSearch] = useState('')
    const id = localStorage.getItem('id')


    useEffect(() => {
        if(id !== undefined && id !== ""){
            if(search !== ""){
                axios.get(`http://localhost:5001/cotisations/mesCotisations/${id}/${search}`)
                .then((response) => {
                    if(response.data === "No Token at all" || response.data === "Invalid Token"){
                        localStorage.clear()
                        History.push('/')
                    }
                    /*else if(response.data === "No Paiements"){
                        setCotisation("")
                        setMsg("No Paiements")
                    }*/
                    else if(response.data.length > 0){
                        setCotisation(response.data)
                        setMsg("")
                    }
                })
                .catch((err) => { console.log(err) })
            }
            else{
                axios.get(`http://localhost:5001/cotisations/mesCotisations/${id}`)
                .then((response) => {
                    //console.log(response)
                    if(response.data === "No Token at all" || response.data === "Invalid Token"){
                        localStorage.clear()
                        History.push('/')
                    }
                    else if(response.data.length > 0){
                        setCotisation(response.data)
                    }
                    else{
                        setMsg("No Cotisations")
                    }
                })
                .catch((err) => 
                {
                    console.log(err)
                })
            }
        }
        else{
            console.log("HEHO ANY ID !")
        }
    },[search, id])



    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Cotisations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher Les Cotisations..." className="form-control" onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div>
            </div>
            <div className="container col-md-8 col-md-offset-2">
                {
                    msg === "" &&
                    <div className="">
                        {
                            cotisations.map((c) => {
                                return(
                                    <div>
                                        <Accordion key={c.RefPaiement} className="mb-5">
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                <Typography className={classes.heading}> <h5 style={{color : "blue"}}><strong> Cotisation du {c.datePaiement.replace("T23:00:00.000Z", "")} </strong></h5>  </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography spacing={3}>
                                                    <Card className={classes.root} elevation={1}>
                                                        <CardContent>
                                                            <Typography variant="body1" color="textPrimary">
                                                                <div className="row" >
                                                                    <div className="col-md-6"> Méthode de Paiement : {c.MethodePaiement} </div>
                                                                    <div className="col-md-6"> Montant à Payer : <strong style={{color : "blue"}}> {c.Montant} (en MAD) X {c.NbrMois} Mois  </strong></div><br/>
                                                                </div>
                                                                {
                                                                    c.MethodePaiement === "Chèque" && 
                                                                    <div className="row">
                                                                        <div className="col-md-6">Numéro du Chèque : <strong>{c.NumeroCheque}</strong>  </div>
                                                                        <div className="col-md-6">Banque : <strong>{c.Banque}</strong>  </div><br/>
                                                                    </div>
                                                                }
                                                                <div className="row">
                                                                    <div className="col-md-6">Du : <strong>{c.Du.replace("T23:00:00.000Z", "")} </strong>  </div>
                                                                    <div className="col-md-6">Au : <strong>{c.Au.replace("T23:00:00.000Z", "")}</strong>  </div>
                                                                </div>
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Typography variant="body2" color="textSecondary" component="p"> Date Paiement : {c.datePaiement.replace("T23:00:00.000Z", "")} </Typography>
                                                        </CardActions>
                                                    </Card>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    msg === "No Paiements" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Vous n'avez aucun Paiement sous Cette Recherche "{search}" </Alert></div>
                }
                {
                       msg === "No Cotisations" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Vous n'avez Aucune Cotisation Pour l'Instant </Alert></div> 
                }
            </div>
        </div>
    )
}

export default ListerMesPaiements
