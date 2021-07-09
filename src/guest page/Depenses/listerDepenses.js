import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Accordion, AccordionSummary, Typography, AccordionDetails, Card, CardContent, CardActions } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import {toast} from 'react-toastify'

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
            textAlign : 'center',
            alignItems: 'center',
        },
    },
    root: {
        width: '955px',
    },
}))


function ListerDepenses() {
    const classes = useStyles()
    const [depense, setDepense] = useState() 
    const [msg, setMsg] = useState('')

    useEffect(() => {
        axios.get("http://localhost:5001/depenses/all")
            .then((resolve) => {
                if(resolve.data.length > 0){
                    setDepense(resolve.data)
                    setMsg("data")
                }
                else{
                    setDepense()
                    setMsg("")
                    toast.warn("Aucune Dépense")
                }
            })
            .catch(() => {

            })
    })


    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Dépenses</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher Les Dépenses..." className="form-control"  />
                        </div>
                    </div><br/><br/>
                </div>
            </div>
            {
                msg === "data" &&
                <div className="container col-md-8 col-md-offset-2">    
                    {
                        depense.map((d) => {
                            return(
                                <div>
                                    <Accordion key={d.RefDepense} className="mb-5">
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                            <Typography className={classes.heading} style={{color : "blue"}}><strong> {d.descriptionDepense} </strong></Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography spacing={3}>
                                                <Card className={classes.root}>
                                                    <CardContent>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <Typography variant="body1" color="textPrimary">La Categorie : <strong>{d.NomCategorie}</strong> </Typography>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <Typography variant="body1" color="textPrimary">Montant : <strong style={{color : "blue"}}>{d.MontantDepense} (en Dhs)</strong></Typography>
                                                            </div>
                                                        </div><br/>
                                                        <Typography > Facture : {d.facture} </Typography>
                                                    </CardContent>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <CardActions><Typography variant="body2" color="textSecondary"> Déclarer par : {d.NomCompte} {d.PrenomCompte} </Typography></CardActions>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <CardActions><Typography variant="body2" color="textSecondary">  Date mise à jour : {d.dateDepense.replace("T23:00:00.000Z", "")} </Typography></CardActions>
                                                        </div>
                                                    </div>
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
        </div>
    )
}

export default ListerDepenses
