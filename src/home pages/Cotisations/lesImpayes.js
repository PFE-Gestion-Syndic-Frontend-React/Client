import React, { useEffect, useState } from 'react'
import {TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    textfield : {
        width : "740px",
    },
    root : {
        width : "793px",
    }
}))


function LesImpayes() {
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [impaye, setImpaye] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/cotisations/getImpayes/" + search)
            .then((resolve) => {
                if(resolve.data === "Not Found"){
                    setImpaye('')
                    setMsg('Not Found')
                }
                else{
                    setImpaye(resolve.data)
                    setMsg('')
                }
            })
            .catch(() => {})
        }
        else{
            axios.get("http://localhost:5001/cotisations/getImpayes")
            .then((resolve) => {
                //console.log(resolve)
                if(resolve.data.length > 0){
                    setImpaye(resolve.data)
                    setMsg('')
                }
            })
            .catch(() => {})
        }
    }, [search])

    return (
        <div style={{top : "120px"}}><br/><br/><br/>
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
            <div className="container col-md-10 col-md-offset-1" style={{marginLeft : "20%"}}>
            {
                msg === "" &&
                <div className="">
                    {
                        impaye.map((c) => {
                            return(
                                <div className="col-md-8 col-md-offset-2">
                                    <Accordion key={c.NumCompte} className="mb-5">
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
                                                                <div className="col-md-6"> Le Dernier Paiement : <strong>{c.du.replace("T23:00:00.000Z", "")}</strong>  </div>
                                                                <div className="col-md-6"> Fait le : <strong> {c.datePaiement.replace("T23:00:00.000Z", "")}  </strong></div><br/>
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
                                                                <div className="col-md-6">Au : <strong style={{color : "red"}}>{c.todate.replace("T23:00:00.000Z", "")}</strong></div><br/>
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
                            )
                        })
                    }
                </div>
            }
            {
                msg === "Not Found" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucun Résultat Pour Cette Recherche "{search}"</Alert></div>
            }
            </div><br/><br/>
        </div>
    )
}

export default LesImpayes
