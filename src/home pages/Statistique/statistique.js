import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Button, Slide, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Util from '../../utils/util'


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
    paper: {
        position: 'relative',
    },
  }));



function Statistique() {
    
    const classes = useStyles()
    const [moisDep, setmoisDep] = useState(1)
    const [anneeDep, setanneeDep] = useState(2021)
    const [moisFin, setFin] = useState(12)
    const [anneeFin, setanneeFin] = useState(2021)
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
        Util()
        /* const datasend = { moisDep : moisDep, anneeDep : anneeDep, moisFin : moisFin, anneeFin : anneeFin}
        if(moisDep !== "" && anneeDep !== ""){
            /*axios.get("http://localhost:5001/statistiques/du", datasend)
            .then((resolve) => {
                console.log(resolve)
            })
            .catch(() => {})
        }
        else{*/
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
        //}
    }, [])


    return (
        <div>
            <Slide direction="up" in={useEffect} mountOnEnter unmountOnExit timeout={1000}>
                <Paper elevation={4} className={classes.paper}>
                    <div className="container ">
                        <div style={{top : "120px", paddingTop : "50px"}}>
                            <h1 style={{marginLeft : "200px"}}>Les Statistiques </h1><br/>
                            <div className="col-md-6" style={{marginLeft : "70%"}}>
                                <Button variant="contained" color="primary" style={{width : "300px", textTransform : "capitalize", fontSize : "16px", color : "white"}} component={Link} to="/relevé-financièr">Demander Relevé Financièr</Button>
                            </div><br/><br/><br/><br/>
                        </div>
                            <div className="container col-md-10 col-md-offset-1">
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-mutiple-name-label">Mois de Départ</InputLabel>
                                            <Select labelId="demo-mutiple-name-label" id="demo-mutiple-name" defaultValue={moisDep} defaultChecked={"Janvier"} onChange={e => setmoisDep(e.target.value)}>
                                                <MenuItem value={1} >Janvier</MenuItem>
                                                <MenuItem value={2} >Février</MenuItem>
                                                <MenuItem value={3} >Mars</MenuItem>
                                                <MenuItem value={4} >Avril</MenuItem>
                                                <MenuItem value={5} >Mai</MenuItem>
                                                <MenuItem value={6} >Juin</MenuItem>
                                                <MenuItem value={7} >Juillet</MenuItem>
                                                <MenuItem value={8} >Août</MenuItem>
                                                <MenuItem value={9} >Septembre</MenuItem>
                                                <MenuItem value={10} >Octobre</MenuItem>
                                                <MenuItem value={11} >November</MenuItem>
                                                <MenuItem value={12} >Décembre</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-mutiple-name-label">Année de Départ</InputLabel>
                                            <Select labelId="demo-mutiple-name-label" id="demo-mutiple-name" defaultValue={anneeDep} defaultChecked={"2021"} onChange={e => setanneeDep(e.target.value)}>
                                                <MenuItem key={2020} value={2021} >2021</MenuItem>
                                                <MenuItem key={2021} value={2022} >2022</MenuItem>
                                                <MenuItem key={2022} value={2023} >2023</MenuItem>
                                                <MenuItem key={2023} value={2024} >2024</MenuItem>
                                                <MenuItem key={2024} value={2025} >2025</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <br/><br/><br/>
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
                    </div><br/><br/><br/>
                </Paper>
            </Slide>
        </div>
    )
}

export default Statistique
