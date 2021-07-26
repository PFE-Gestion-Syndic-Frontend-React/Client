import React, { useEffect, useState } from 'react'
import { Button, Slide, Paper } from '@material-ui/core'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


function Statistique() {
    const History = useHistory()
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

        axios.get("/statistiques/data")
        .then((response) => {
            console.log(response.data)
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
        <Slide direction="up" in={useEffect} mountOnEnter unmountOnExit timeout={1000}>
            <Paper>
                <div className="container ">
                    <div style={{paddingTop : "55px"}}>
                        <h1 style={{marginLeft : "90px"}}>Les Statistiques </h1><br/>
                        <div className="col-md-6" style={{marginLeft : "70%"}}>
                            <Button variant="contained" color="primary" style={{width : "300px", textTransform : "capitalize", fontSize : "16px", color : "white"}} component={Link} to="/relevé-financièr">Demander Relevé Financièr</Button>
                        </div><br/><br/><br/><br/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card w-100 text-black bg-primary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                    <div className=" row">
                                        <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-people-fill m-5" style={{width : "700px"}} ></i></h1> </div>
                                        <h3 className="" style={{paddingLeft : "45px"}} > {NbrUsers} Utilisateurs ( {admi} Administrateurs et {copro} Copropriétaires ) </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card w-100 text-black bg-secondary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                    <div className="row">
                                        <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-wallet2 m-5" style={{width : "700px"}}></i></h1></div>
                                        <h5 style={{paddingLeft : "45px"}}> Nombre des Dépenses : {NbrDepense}, Montant TTC <strong style={{color : "white"}}>{MontantDepense}</strong>  MAD.</h5>
                                        <h6 style={{paddingLeft : "270px", color : "red", fontSize : "20px"}} ><strong>{mois} / {year}</strong></h6>
                                        <h5 style={{paddingLeft : "45px"}}> Nombre des Dépenses Courante : {NbrDepCurrent}, Montant TTC <strong style={{color : "white"}}>{mntDepCurrent}</strong>  MAD.</h5>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{paddingTop : "10px"}} >
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card w-100 text-black bg-primary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                    <div className=" row">
                                        <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-clipboard-check m-5" style={{width : "700px"}} ></i></h1> </div>
                                        <h5 className="" style={{paddingLeft : "45px"}} > Nombre des Annonces : {NbrAnnonce}, Nombre des Réclamations : {NbrRecla}. </h5>
                                        <h6 style={{paddingLeft : "270px", color : "red", fontSize : "20px"}} ><strong>{mois} / {year}</strong></h6>
                                        <h5 className="" style={{paddingLeft : "45px"}} > Nombre des Annonces Courante : {NbrAnnCurrent}, Nombre des Réclamations Courante : {NbrReclaCurrent}. </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card w-100 text-black bg-secondary mb-3" style={{height : "300px", borderRadius : "25px"}}>
                                    <div className="row">
                                        <div className="card-img mt-3"><h1 style={{fontSize : "100px"}}><i className="bi bi-wallet m-5" style={{width : "700px"}}></i></h1></div>
                                        <h5 style={{paddingLeft : "45px"}}> Nombre des Cotisations : {NbrCoti}, Les Retenus <strong style={{color : "white"}}>{MontantCoti} </strong>MAD.</h5>
                                        <h6 style={{paddingLeft : "270px", color : "red", fontSize : "20px"}} ><strong>{mois} / {year}</strong></h6>
                                        <h5 style={{paddingLeft : "45px"}}> Nombre des Cotisations Courante : {NbrCotiCurrent}, Les Retenus <strong style={{color : "white"}}>{mntCotiCurrent} </strong>MAD.</h5>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div><br/><br/><br/>
            </Paper>
        </Slide>
    )
}

export default Statistique
