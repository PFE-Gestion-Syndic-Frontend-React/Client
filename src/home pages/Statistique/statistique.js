import React, { useEffect, useState } from 'react'
import { Button, Slide, Paper, Badge, Tooltip } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { AccountCircle, NotificationsActiveOutlined, Assignment, AccountBalanceWallet, CreditCardOutlined } from '@material-ui/icons'
import Marquee from "react-fast-marquee"


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
            //margin: theme.spacing(1),
            width: 320,
        },
    },
    formControl: {
        //margin: theme.spacing(1),
        width: 320,
    },
    paper: {
        position: 'relative',
    },
  }));



function Statistique() {
    const History = useHistory()
    const classes = useStyles()
    const [NbrDepense, setNbrDepense] = useState('')
    const [MontantDepense, setMontantDepense] = useState('')
    const [NbrUsers, setNbrUsers] = useState('')
    const [admi, setAdmi] = useState('')
    const [copro, setCopro] = useState('')
    const [NbrCoti, setNbrCoti] = useState('')
    const [MontantCoti, setMontantCoti] = useState('')
    const [NbrAnnonce, setNbrAnnonce] = useState('')
    const [NbrRecla, setNbrRecla] = useState('')
    const [NbrCotiCurrent, setNbrCotiCurrent] = useState('')
    const [mntCotiCurrent, setMntCotiCurrent] = useState('')
    const [NbrReclaCurrent, setNbrReclaCurrent] = useState('')
    const [NbrAnnCurrent, setNbrAnnCurrent] = useState('')
    const [NbrDepCurrent, setNbrDepCurrent] = useState('')
    const [mntDepCurrent, setMntDepCurrent] = useState('')
    const [mois, setMois] = useState('')
    const [year, setYear] = useState('')

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

        axios.get("/statistiques/data")
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
            setNbrCotiCurrent(response.data[7][0].NbrPaiementCurrent)
            setMntCotiCurrent(response.data[7][0].montantPayedCurrent)
            setNbrReclaCurrent(response.data[8][0].NbrReclamCurrent)
            setNbrAnnCurrent(response.data[9][0].NbrAnonceCurrent)
            setNbrDepCurrent(response.data[10][0].NbrDepenseCurrent)
            setMntDepCurrent(response.data[10][0].montantCurrent)
            setMois(response.data[11][0].mois)
            setYear(response.data[11][0].year)
        })
        .catch(() => {})
    }, [History])


    return (
        <div>
            <Slide direction="up" in={useEffect} mountOnEnter unmountOnExit timeout={1000}>
                <Paper className={classes.paper}>
                    <div className="container ">
                        <div style={{paddingTop : "55px"}}>
                            <h1 style={{marginLeft : "90px"}}>Les Statistiques </h1><br/>
                            <div className="col-md-6" style={{marginLeft : "70%"}}>
                                <Button variant="contained" color="primary" style={{width : "300px", textTransform : "capitalize", fontSize : "16px", color : "white"}} component={Link} to="/relev??-financi??r">Demander Relev?? Financi??r</Button>
                            </div><br/><br/><br/><br/>
                        </div>
                        <div className="row" style={{textAlign : "center"}} ><Marquee speed="150" style={{color : "blue"}}><h3>Le Solde Actuel est {MontantCoti - MontantDepense} MAD</h3></Marquee></div><br/><br/>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card w-100 text-black bg-primary mb-3" style={{height : "280px", borderRadius : "25px"}}>
                                        <div className=" row mt-4">
                                            <div className="row">
                                                <div className="card-img mt-3"><h1 style={{fontSize : "50px", paddingLeft : "45px"}}><Tooltip title="Utilisateurs"><Badge badgeContent={NbrUsers} color="secondary"><AccountCircle style={{fontSize : "50px"}} /></Badge></Tooltip></h1></div>
                                                <h5 className="" style={{paddingLeft : "45px"}}>( <strong style={{color : "silver"}} > {admi} </strong> Administrateurs et <strong style={{color : "silver"}}>{copro}</strong>  Copropri??taires ) </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="card w-100 text-black bg-secondary mb-3" style={{height : "280px", borderRadius : "25px"}}>
                                        <div className="row mt-4">
                                            <h6 style={{textAlign : "center", color : "black", fontSize : "20px"}} ><strong>Statistique Globale</strong></h6>
                                            <div className="row">
                                                <div className="col-md-6" style={{textAlign : "right"}}><div className="card-img mt-3"><h1 style={{fontSize : "50px"}}><Tooltip title="D??penses"><Badge badgeContent={NbrDepense} color="secondary"><CreditCardOutlined style={{fontSize : "50px"}} /></Badge></Tooltip></h1></div></div>
                                                <div className="col-md-6" style={{textAlign : "left"}}><div className="mt-5"><h4 style={{fontSize : "20px"}}><strong style={{color : "silver"}}>{MontantDepense} MAD</strong></h4></div></div>
                                            </div>
                                            <h6 style={{textAlign : "center", color : "black", fontSize : "20px"}} ><strong>Statistique du {mois} / {year}</strong></h6>
                                            <div className="row">
                                                <div className="col-md-6" style={{textAlign : "right"}}><div className="card-img mt-3"><h1 style={{fontSize : "50px"}}><Tooltip title="D??penses"><Badge badgeContent={NbrDepCurrent} color="secondary"><CreditCardOutlined style={{fontSize : "50px"}} /></Badge></Tooltip></h1></div></div>
                                                <div className="col-md-6" style={{textAlign : "left"}}><div className="mt-5"><h4 style={{fontSize : "20px"}}><strong style={{color : "silver"}}>{mntDepCurrent} MAD</strong></h4></div></div>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container" style={{paddingTop : "10px"}} >
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="card w-100 text-black bg-primary mb-3" style={{height : "280px", borderRadius : "25px"}}>
                                        <div className=" row mt-4">
                                            <h6 style={{textAlign : "center", color : "black", fontSize : "20px"}} ><strong>Statistique Globale</strong></h6>
                                            <div className="row">
                                                <div className="col-md-6" style={{textAlign : "right"}}><div className="card-img mt-3"><h1 style={{fontSize : "50px"}}><Tooltip title="R??clamations"><Badge badgeContent={NbrRecla} color="secondary"><Assignment style={{fontSize : "50px"}} /></Badge></Tooltip></h1> </div></div>
                                                <div className="col-md-6" style={{textAlign : "left"}}><div className="card-img mt-3"><h1 style={{fontSize : "50px"}}><Tooltip title="Annonces"><Badge badgeContent={NbrAnnonce} color="secondary"><NotificationsActiveOutlined style={{fontSize : "50px"}} /></Badge></Tooltip></h1></div></div>
                                            </div>
                                            <h6 style={{textAlign : "center", color : "black", fontSize : "20px"}} ><strong>Statistique du {mois} / {year}</strong></h6>
                                            <div className="row">
                                                <div className="col-md-6" style={{textAlign : "right"}}><div className="card-img mt-3"><h1 style={{fontSize : "50px"}}><Tooltip title="R??clamations"><Badge badgeContent={NbrReclaCurrent} color="secondary"><Assignment style={{fontSize : "50px"}} /></Badge></Tooltip></h1> </div></div>
                                                <div className="col-md-6" style={{textAlign : "left"}}><div className="card-img mt-3"><h1 style={{fontSize : "50px"}}><Tooltip title="Annonces"><Badge badgeContent={NbrAnnCurrent} color="secondary"><NotificationsActiveOutlined style={{fontSize : "50px"}} /></Badge></Tooltip></h1></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="card w-100 text-black bg-secondary mb-3" style={{height : "280px", borderRadius : "25px"}}>
                                        <div className="row mt-4">
                                            <h6 style={{textAlign : "center", color : "black", fontSize : "20px"}} ><strong>Statistique Globale</strong></h6>
                                            <div className="row">
                                                <div className="col-md-6" style={{textAlign : "right"}}><div className="card-img mt-3"><h1 style={{fontSize : "50px"}}><Tooltip title="Cotisations"><Badge badgeContent={NbrCoti} color="secondary"><AccountBalanceWallet style={{fontSize : "50px"}} /></Badge></Tooltip></h1></div></div>
                                                <div className="col-md-6" style={{textAlign : "left"}}><div className="mt-5"><h4 style={{fontSize : "20px"}}><strong style={{color : "silver"}}>{MontantCoti} MAD</strong></h4></div></div>
                                            </div>
                                            <h6 style={{textAlign : "center", color : "black", fontSize : "20px"}} ><strong>Statistique du {mois} / {year}</strong></h6>
                                            <div className="row">
                                                <div className="col-md-6" style={{textAlign : "right"}}><div className="card-img mt-3"><h1 style={{fontSize : "50px"}}><Tooltip title="Cotisations"><Badge badgeContent={NbrCotiCurrent} color="secondary"><AccountBalanceWallet style={{fontSize : "50px"}} /></Badge></Tooltip></h1></div></div>
                                                <div className="col-md-6" style={{textAlign : "left"}}><div className="mt-5"><h4 style={{fontSize : "20px"}}><strong style={{color : "silver"}}>{mntCotiCurrent} MAD</strong></h4></div></div>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><br/><br/><br/>
                </Paper>
            </Slide>
        </div>
    )
}

export default Statistique
