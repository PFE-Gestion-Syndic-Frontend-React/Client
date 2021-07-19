import React, { useEffect, useState } from 'react'
import { Grow, Paper, Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Util from '../../utils/util';




const useStyles = makeStyles((theme) => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop : theme.spacing(1),
        textAlign : 'center',
        width: "100%",
    },
    paper : {
        padding : "20px",
    },
}))

function ReleveFinancier() {
    const classes = useStyles()
    const [data, setData] = useState([])
    const [dep, setDepense] = useState('')
    const [cot, setCotisation] = useState('')

    useEffect(() => {
        Util()
        axios.get("http://localhost:5001/releves/all")
        .then((resolve) => {
            if(resolve.data.length > 0){
                setData(resolve.data)
            }
        })
        .catch(() => {})
    }, [])

    const handleDep = (Montant) => {
        setDepense(Montant)
    }

    const handleCot = (Montant) => {
        setCotisation(Montant)
    }

    return (
        <div style={{top : "90px"}}>
            <h1 style={{marginLeft : "200px", paddingTop : "2%"}}>Les Relevés Financièr </h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/><br/>
                <div className="container col-md-12 ">
                    {
                        data &&
                        data.map((d) => {
                            return([
                                <div>
                                    {
                                        d[3].map((date, index) => {
                                            return(
                                                <Grow key={index} in={useEffect} timeout={1000}>
                                                    <Paper >
                                                        <Accordion className="mb-3 card">
                                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                                <Typography className={classes.heading}> <h5 style={{textAlign : "center", color : "blue"}}>Situation Financièr du {date.month} / {date.year} </h5> </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Card className="card container col-md-12">
                                                                    <CardContent>
                                                                        {
                                                                            d[0].map((c, index) => {
                                                                                return(
                                                                                    <div className="row" key={index}>
                                                                                        <div className="col-md-4"style={{fontSize : "18px"}}>Nombre des Cotisations : <strong>{c.NbrCotisation}</strong></div>  
                                                                                        <div className="col-md-4"></div>
                                                                                        <div className="col-md-4"style={{fontSize : "18px"}}> Solde au {date.month - 1} / {date.year} : <strong onChange={handleCot.bind(this, c.MontantCotisation)}>{c.MontantCotisation === null ? 0 : c.MontantCotisation} MAD</strong></div><br/><br/>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                        <table className="table table-striped">
                                                                            <tr className="thead-light">
                                                                                <th style={{width : "80%", fontSize : "18px"}}><u>Dépense</u> </th>
                                                                                <th style={{width : "20%", fontSize : "18px", textAlign : "center"}}><u>Montant (MAD)</u></th>
                                                                            </tr>
                                                                                {
                                                                                    d[1].map((de, index) => {
                                                                                        return(
                                                                                            <tr key={index}>
                                                                                                <td style={{width : "80%", fontSize : "16px"}}>{de.descriptionDepense}</td>
                                                                                                <td style={{width : "20%", fontSize : "17px", textAlign : "center"}}><strong>{de.MontantDepense}</strong></td>
                                                                                            </tr>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            <div className="dropdown-divider"></div>
                                                                        </table>
                                                                        <div className="">
                                                                            <table className="table table-striped">
                                                                                <tr>
                                                                                    {
                                                                                        d[2].map((h, index) => {
                                                                                            return(
                                                                                                <div className="row" key={index}>
                                                                                                    <div className="col-md-9" style={{fontSize : "18px"}}>Montant des Depenses </div>
                                                                                                    <div className="col-md-3" style={{fontSize : "18px"}}><strong onChange={handleDep.bind(this, h.MontantDepense)}>{h.MontantDepense} MAD</strong></div>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                        <div className="row"><h3>Le Solde Actuel : {cot - dep} MAD</h3></div> 
                                                                    </CardContent>
                                                                </Card>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </Paper>
                                                </Grow>
                                            )
                                        })
                                    }
                                    <br/><br/><br/>
                                </div>
                            ])
                        })
                    }
                </div>
            </div><br/><br/><br/>
        </div>
    )
}

export default ReleveFinancier
