import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grow, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Alert }from '@material-ui/lab'
import { useHistory } from 'react-router'

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
        width: '915px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paper : {
        margin : "20px",
    },
    textfield : {
        width : "780px",
    },
}))



function ListerAnnonces() {
    const History = useHistory()
    const classes = useStyles()
    const [annonces, setAnnonce] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [periode, setPeriode] = useState(0)

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

        if(periode === 0){
            if(search !== ""){
                console.log(search)
                axios.get("/annonces/all/statut/true/" + search)
                .then((response) => {
                    if(response.data.msgErr === "No Token Set"){
                        localStorage.clear()
                        History.push('/')
                    }
                    else if(response.data === 'No Annonce'){
                        setAnnonce([])
                        setMsg('No Annonce')
                    }
                    else if(response.data.length > 0){
                        setAnnonce(response.data)
                        setMsg("")
                    }
                    else {
                        setMsg("No Annonce")
                        setAnnonce([])
                    }
                })
                .catch(() => {})
            }
            else{
                axios.get("/annonces/all/statut/true")
                .then((response) => {
                    if(response.data.msgErr === "No Token Set"){
                        localStorage.clear()
                        History.push('/')
                    }
                    else if(response.data === 'No Annonce'){
                        setAnnonce([])
                        setMsg('No Annonce')
                    }
                    else if(response.data.length > 0){
                        setAnnonce(response.data)
                        setMsg("")
                    }
                    else {
                        setAnnonce([])
                        setMsg('No Annonce')
                    }
                })
                .catch(() => {})
            }
        }
        else if(periode === 1 || periode === 3 || periode === 6){
            const datasend = {perd : periode}
            const run3 = axios.post("/annonces/coproprietaire/periode", datasend)
            .then((res)=>{
                if(res.data === 'No Annonce'){
                    setAnnonce([])
                    setMsg('No Annonce')
                }
                else if(res.data.length > 0){
                    setAnnonce(res.data)
                    setMsg("")
                }
                else {
                    setAnnonce([])
                    setMsg('No Annonce')
                }
            })
            .catch(() => {})

            return (() => clearInterval(run3))
        }
    }, [search, History, periode])

    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Annonces</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Annonces..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <FormControl className={classes.formControl} style={{width : "100%"}}>
                                <InputLabel InputLabelProps={{ shrink: true,}} id="demo-simple-select-label">Consulter Par Période</InputLabel>
                                <Select style={{width : "100%"}} onChange={e => setPeriode(e.target.value)} displayEmpty className={classes.selectEmpty} defaultChecked={"Toutes Les Annonces"} defaultValue={0}>  
                                    <MenuItem value={0}>Toutes Les Annonces</MenuItem>  
                                    <MenuItem value={1}>Le Mois Courant</MenuItem>    
                                    <MenuItem value={3}>Les 3 Mois Précidents</MenuItem>
                                    <MenuItem value={6}>Les 6 Mois Précidents</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div><br/><br/>
            </div>
            <div>
                {
                    msg === "" &&
                    <div className="container col-md-8 col-md-offset-2">
                        {
                            annonces.length > 0 &&
                            annonces.map((a) => {
                                return(
                                    <Grow key={a.RefAnnonce} in={useEffect} timeout={1000}> 
                                        <Paper elevation={4} className={classes.paper}>
                                            <Accordion className="mb-5 card">
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                    <Typography className={classes.heading}> <h5 style={{color : "blue"}}><strong>{a.Sujet}</strong></h5>  </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={classes.root} elevation={1}>
                                                            <CardContent>
                                                                <Typography variant="body1" color="textPrimary">
                                                                    {a.DescripAnnonce}
                                                                </Typography><br/><br/>
                                                                {
                                                                    a.contenuDocument !== null &&
                                                                    <div className="overflow">
                                                                        <img className="scaleImg" src={`annonce doc/${a.contenuDocument}`} alt="" style={{width : "200px", height : "200px"}} />
                                                                    </div>
                                                                }
                                                            </CardContent>
                                                            <CardActions>
                                                                <div className="row container">
                                                                    <div className="col-md-6"><Typography variant="body2" color="textSecondary"> Partager Par : {a.NomCompte} {a.PrenomCompte} </Typography></div>
                                                                    <div className="col-md-6"><Typography variant="body2" color="textSecondary"> Date Publication : {a.dateAnnonce && a.dateAnnonce.replace("T23:00:00.000Z", "")} </Typography></div>
                                                                </div>
                                                            </CardActions>
                                                        </Card>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Paper>
                                    </Grow>
                                )
                            })
                        }
                        <br/><br/><br/>
                    </div>
                }
                {
                    search !== "" ? 
                    <div className="col-md-6" style={{marginLeft : "24%"}}>{msg === "No Annonce" && <div><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Annonce Pour Cette Recherche "{search}"</strong></Alert></div>}</div> 
                    :
                    <div className="col-md-6" style={{marginLeft : "24%"}}>{msg === "No Annonce" && <div><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Annonce Pour l'Instant</strong></Alert></div>}</div> 
                }
            </div>
        </div>
    )
}

export default ListerAnnonces
