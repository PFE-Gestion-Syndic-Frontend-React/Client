import React, { useEffect, useState } from 'react'
import { Paper, Grow, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router'


const useStyles = makeStyles((theme) => ({
    textfield : {
        width : "740px",
    },
    root : {
        width : "955px",
    },
}))


function LesImpayes() {
    const History = useHistory()
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [impaye, setImpaye] = useState([])
    const [msg, setMsg] = useState('')

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

        if(search !== ""){
            const run = axios.get("/cotisations/getImpayes/" + search)
            .then((resolve) => {
                if(resolve.data === 'Not Found'){
                    setImpaye([])
                    setMsg('Not Found')
                }
                else if(resolve.data !== 'Not Found'){
                    setImpaye(resolve.data)
                    setMsg('')
                }
                else{
                    setImpaye([])
                    setMsg('Not Found')
                }
            })
            .catch(() => {})

            return (() => clearInterval(run))
        }
        else{
            const run1 = axios.get("/cotisations/getImpayes")
            .then((resolve) => {
                if(resolve.data === 'Not Found'){
                    setImpaye([])
                    setMsg('Not Found')
                }
                else if(resolve.data !== 'Not Found'){
                    setImpaye(resolve.data)
                    setMsg('')
                }
                else{
                    setImpaye([])
                    setMsg('Not Found')
                }
            })
            .catch(() => {})

            return(() => clearInterval(run1))
        }
    }, [search, msg, History])

    return (
        <div style={{top : "90px"}}><br/><br/>
            <h1 style={{marginLeft : "200px"}}>Lister Les Impayés</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Impayés..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div><br/>
            </div><br/>
            <div className="container col-md-8 col-md-offset-2" style={{marginRight : "15%"}}>
            {
                msg === "" &&
                <div className="">
                    {
                        impaye.length > 0 &&
                        impaye.map((c) => {
                            return(
                                <Grow key={c.NumCompte} in={useEffect} timeout={2000}>
                                    <Paper>
                                        <div className="">
                                            <Accordion className="mb-5">
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                    <Typography className={classes.heading}> <h5><strong> Le Copropriétaire : <span style={{color : "blue"}}>{c.NomCompte} {c.PrenomCompte}</span>  </strong></h5>  </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={classes.root}>
                                                            <CardHeader subheader={`Logement :  ${c.RefLogement}`} />
                                                            <CardContent>
                                                                <Typography variant="body1" color="textPrimary">
                                                                    <div className="row" >
                                                                        <div className="col-md-6"> E-mail : <strong>{c.EmailCompte}</strong></div>
                                                                        <div className="col-md-6"> Téléphone : <strong> {c.telephone}  </strong></div>
                                                                    </div><br/>
                                                                    <div className="row" >
                                                                        <div className="col-md-6"> Le Dernier Paiement : <strong>{c.du && c.du.replace("T23:00:00.000Z", "")}</strong>  </div>
                                                                        <div className="col-md-6"> Fait le : <strong> {c.datePaiement && c.datePaiement.replace("T23:00:00.000Z", "")}  </strong></div><br/>
                                                                    </div><br/>
                                                                    <div className="row">
                                                                        <div>La Méthode du Dernier Paiement effectué : <strong> {c.MethodePaiement === "Chèque" ? "par Chèque" : "en Espèce"}  </strong> </div>
                                                                    </div><br/>
                                                                    <div>
                                                                        {
                                                                            c.MethodePaiement === "Chèque" && 
                                                                            <div className="row">
                                                                                <div className="col-md-6">Numéro du Chèque : <strong>{c.NumeroCheque}</strong></div>
                                                                                <div className="col-md-6">Banque : <strong>{c.Banque}</strong></div><br/>
                                                                            </div>
                                                                        }
                                                                        <br/>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6">La Periode Impayés : <strong style={{color : "red"}}>{c.periode} mois</strong></div>
                                                                        <div className="col-md-6">Au : <strong style={{color : "red"}}>{c.todate && c.todate.replace("T23:00:00.000Z", "")}</strong></div><br/>
                                                                    </div><br/> 
                                                                    <div className="row">
                                                                        <div><h3>Le Montant à Payer est : <strong style={{color : "red"}}> {200 * c.periode} MAD </strong> </h3> </div>
                                                                    </div>
                                                                </Typography>
                                                            </CardContent>
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
                </div>
            }
            {
                search !== "" ?
                <div>{ msg === "Not Found" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucun Résultat Pour Cette Recherche "{search}"</strong></Alert></div> }</div>
                :
                <div>{ msg === "Not Found" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="success"><strong style={{fontSize : "18px"}}>Tous les Copropriétaires ont Payées leurs Cotisations</strong></Alert></div> }</div>
            }
            </div><br/><br/>
        </div>
    )
}

export default LesImpayes
