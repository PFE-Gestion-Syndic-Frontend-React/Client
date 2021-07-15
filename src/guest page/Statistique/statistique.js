import React, { useEffect, useState } from 'react'
import { TextField, Slide, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop : theme.spacing(1),
      textAlign : 'center',
      width: "70%",
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 320,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 320,
    },
    paper : {
        position: 'relative',
        paddingTop : '0',
        marginTop : '0',
    },
  }));


function Statistique() {
    const classes = useStyles()
    const [depart, setDepart] = useState(null)
    const [fin, setFin] = useState(null)
    const [NbrDepense, setNbrDepense] = useState('')
    const [MontantDepense, setMontantDepense] = useState('')
    const [NbrUsers, setNbrUsers] = useState('')
    const [admi, setAdmi] = useState('')
    const [copro, setCopro] = useState('')
    const [NbrCoti, setNbrCoti] = useState('')
    const [MontantCoti, setMontantCoti] = useState('')
    const [NbrAnnonce, setNbrAnnonce] = useState('')
    const [NbrRecla, setNbrRecla] = useState('')


    useEffect(() => {
        axios.get("http://localhost:5001/statistiques/data")
        .then((response) => {
            setNbrDepense(response.data[0][0].NbrDepense)
            setMontantDepense(response.data[0][0].montant)
            setNbrUsers(response.data[1][0].NbrUsers)
            setAdmi(response.data[2][0].admi)
            setCopro(response.data[3][0].copro)
            setNbrCoti(response.data[4][0].NbrPaiement)
            setMontantCoti(response.data[4][0].montantPayed)
            setNbrAnnonce(response.data[5][0].NbrAnonce)
            setNbrRecla(response.data[6][0].NbrReclam)
        })
        .catch(() => {})
    }, [])

    if(depart !== fin){

    }

    return (
        <Slide direction="up" in={useEffect} mountOnEnter unmountOnExit timeout={1000}>
            <Paper elevation={4} className={classes.paper}>
                <div className="container ">
                    <div style={{top : "120px", paddingTop : "50px"}}>
                        <h1 style={{marginLeft : "200px"}}>Les Statistiques </h1><br/><br/><br/>
                    </div>
                        <div className="row">
                            <div className="col-md-6"><TextField InputLabelProps={{ shrink: true,}} id="date" label="Du" type="date" className={classes.textField} onChange={e => setDepart(e.target.value)} /></div>
                            <div className="col-md-6"><TextField InputLabelProps={{ shrink: true,}} id="date" label="Au" type="date" className={classes.textField} onChange={e => setFin(e.target.value)} /></div>
                        </div><br/><br/><br/><br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card w-75 text-black bg-primary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                    <div className=" row">
                                        <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-people-fill m-5" style={{width : "700px"}} ></i></h1> </div>
                                        <h2 className="" style={{paddingLeft : "45px"}} > {NbrUsers} Utilisateurs ( {admi} Administrateurs et {copro} Copropriétaires) </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card w-75 text-black bg-secondary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                    <div className="row">
                                        <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-wallet2 m-5" style={{width : "700px"}}></i></h1></div>
                                        <h2 style={{paddingLeft : "45px"}}> Nombre des Dépenses : {NbrDepense} </h2>
                                        <h3 style={{paddingLeft : "45px"}}> Montant TTC <strong style={{color : "white"}}>{MontantDepense}</strong>  MAD</h3><br /><br/><br/>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div><br/><br/><br/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card w-75 text-black bg-primary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                    <div className=" row">
                                        <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-clipboard-check m-5" style={{width : "700px"}} ></i></h1> </div>
                                        <h3 className="" style={{paddingLeft : "45px"}} > Nombre des Annonces : {NbrAnnonce} </h3>
                                        <h3 className="" style={{paddingLeft : "45px"}} > Nombre des Réclamations : {NbrRecla} </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card w-75 text-black bg-secondary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                    <div className="row">
                                        <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-wallet m-5" style={{width : "700px"}}></i></h1></div>
                                        <h2 style={{paddingLeft : "45px"}}> Nombre des Cotisations : {NbrCoti} </h2>
                                        <h3 style={{paddingLeft : "45px"}}> Les Retenus <strong style={{color : "white"}}>{MontantCoti} </strong>MAD</h3><br /><br/><br/>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div><br/><br/><br/><br/><br/><br/>
            </Paper>
        </Slide>
    )
}

export default Statistique
