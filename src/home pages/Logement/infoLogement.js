import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Avatar, Accordion, AccordionSummary, AccordionDetails, Card, CardHeader, CardContent, CardActions } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 345,
    },
    root1: {
        width: 925,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar : {
        width : "200px",
        height : "200px",
    },
  }));
  

function InfoLogement(props) {
    const classes = useStyles()
    const RefLogement = props.match.params.refLogement
    const [compte, setCompte] = useState([])
    const [cotisation, setCotisation] = useState([])
    const [id, setId] = useState('')
    const [msg, setMsg] = useState('')
    const [reclamation, setReclamation] = useState([])
    const [rec, setRec] = useState('')
    const [cot, setCot] = useState('')





    useEffect( () => {
        axios.get(`http://localhost:5001/logements/coproprietaire/${RefLogement}`)
        .then((resolve) => {
            console.log(resolve)
            if(resolve.data === "No Logement"){
                setCompte([])
                setId('')
                setMsg('No Logement')
            }
            else if(resolve.data.length !== 0){
                setCompte(resolve.data[0])
                setId(compte.NumCompte)
                setMsg("Loading")
            }
        })
        .catch(() => {})

        if(id !== ""){
            axios.get(`http://localhost:5001/cotisations/mesCotisations/${id}`)
            .then((response) => {
                console.log(response)
                if(response.data === "No Token at all" || response.data === "Invalid Token"){
                    localStorage.clear()
                    History.push('/')
                }
                else if(response.data === "No Cotisation"){
                    setCotisation([])
                    setCot("No Cotisation")
                }
                else if(response.data.length !== 0){
                    setCotisation(response.data)
                    setCot("")
                }
                else{
                    setCotisation([])
                    setCot("No Cotisation")
                }
            })
            .catch(() => {})
        }

        axios.get(`http://localhost:5001/reclamations/logement/${RefLogement}`)
        .then((res) => {
            if(res.data === "No Réclamation"){
                setReclamation([])
                setRec('No Réclamation')
            }
            else if(res.data.length !== 0){
                setReclamation(res.data)
                setRec('')
            }
            else{
                setReclamation([])
                setRec('No Réclamation')
            }
        })
        .catch(() => {})

    }, [id, RefLogement, compte.NumCompte])

    return (
        <div style={{ paddingTop : "5%"}}>
            {
                msg === "Loading" &&    
                <div className="container col-md-8 col-md-offset-2">
                    {
                        compte !== "" &&
                        <div>
                            <Card className={classes.root} style={{marginTop : "7px", marginBottom : "7px"}} onChange={() => setId(compte.NumCompte)}>
                                <div className="col-md-12">
                                    <CardHeader title={" Nom et Prénom : " + compte.NomCompte + " " + compte.PrenomCompte + " "  } />
                                </div>
                                <CardContent>
                                    <div className="row">
                                        <div className="col-md-6"><Typography style={{fontSize : "18px"}}> Téléphone : <strong>{compte.telephone}</strong> </Typography></div>
                                        <div className="col-md-6"><Typography style={{fontSize : "18px"}}> Adresse E-mail : <strong>{compte.EmailCompte}</strong> </Typography></div>
                                    </div><br/>
                                    <div className="row">
                                        <Typography style={{fontSize : "18px"}}> Adresse : <strong> {compte.RefLogement} </strong> </Typography>
                                    </div>
                                </CardContent>
                            </Card><br/>
                        </div>    
                    }
                    <div>
                        {
                            cot === "" && 
                            <div className="mt-4">
                                <Card>
                                    <CardHeader />
                                    <div className="row">
                                        <h4 style={{marginLeft : "20px"}}><strong>Ses Cotisations :</strong></h4>
                                    </div>
                                    <CardContent>
                                        {
                                            cotisation.map((c) => {
                                                return(
                                                    <Accordion key={c.RefPaiement} className="mb-3 card">
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                            <Typography className={classes.heading}> <h5> Réf Paiement : <strong style={{color : "blue"}}>{c.RefPaiement}</strong></h5></Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <div className="mt-2 mb-3 card">
                                                                <Card className={classes.root1} key={c.RefPaiement}>
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
                                                                                <div className="col-md-6">Du : <strong>{c.Du && c.Du.replace("T23:00:00.000Z", "")} </strong>  </div>
                                                                                <div className="col-md-6">Au : <strong>{c.Au && c.Au.replace("T23:00:00.000Z", "")}</strong>  </div>
                                                                            </div>
                                                                        </Typography>
                                                                    </CardContent>
                                                                    <CardActions>
                                                                        <Typography variant="body2" color="textSecondary"> Date Paiement : {c.datePaiement && c.datePaiement.replace("T23:00:00.000Z", "")} </Typography>
                                                                    </CardActions>
                                                                </Card>
                                                            </div>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )
                                            })
                                        }
                                    </CardContent>
                                </Card><br/>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            cot === "No Cotisation" && 
                            <div className="col-md-6" style={{marginLeft : "25%"}}><Alert style={{textAlign : "center"}} severity="warning"><strong style={{fontSize : "18px"}}>Le Copropriétaire n'a Aucune Cotisation !</strong></Alert></div>
                        }
                    </div>
                    {
                        rec === "" && 
                        <div className="mt-4">
                            <Card>
                                <CardHeader />
                                <div className="row">
                                    <h4 style={{marginLeft : "20px"}}><strong>Ses Réclamations :</strong></h4>
                                </div>
                                <CardContent>
                                    {
                                        reclamation.map((r) => {
                                            return(
                                                <Accordion key={r.RefReclamation} className="mb-3 card">
                                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                        <Typography className={classes.heading}> <h5> Etat du Réclamation : <strong style={{color : "blue"}}>{r.statut}</strong></h5>  </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <div className="mt-2">
                                                            <Card className={classes.root1} key={r.RefReclamation} style={{ marginBottom : "7px"}}>
                                                                <CardContent>
                                                                    <Typography variant="body1" color="textPrimary">
                                                                        <div className="row" >
                                                                            {r.Objet}
                                                                        </div>
                                                                        <div className="row">
                                                                            {r.Message}
                                                                        </div>
                                                                    </Typography>
                                                                    {
                                                                        r.contenu !== null &&
                                                                        <div className="overflow"><Avatar className="scaleImg" src={`reclamation support/${r.contenu}`} alt="" style={{width : "200px", height : "200px"}} /></div>
                                                                    }
                                                                </CardContent>
                                                                <CardActions>
                                                                    <div className="row col-md-12">
                                                                        <div className="col-md-6"><Typography variant="body2" color="textSecondary"> Cette Réclamation est <strong>{r.pour}</strong>  </Typography></div>
                                                                        <div className="col-md-6"><Typography variant="body2" color="textSecondary"> Date mise à Jour du Réclamation : {r.dateReclamation && r.dateReclamation.replace("T23:00:00.000Z", "")} </Typography></div>
                                                                    </div>
                                                                </CardActions>
                                                            </Card>
                                                        </div>
                                                    </AccordionDetails>
                                                </Accordion>
                                            )
                                        })
                                    }
                                </CardContent>
                            </Card><br/><br/><br/>
                        </div>
                    }
                    {
                        rec === "No Réclamation" && 
                        <div className="col-md-6" style={{marginLeft : "25%"}}><Alert style={{textAlign : "center"}} severity="info"><strong style={{fontSize : "18px"}}>Le Copropriétaire n'a Aucune Réclamation </strong></Alert></div>
                    }
                </div>
            }<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default InfoLogement
