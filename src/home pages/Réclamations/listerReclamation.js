import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grow, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { UpdateOutlined }from '@material-ui/icons';
import { useHistory } from 'react-router';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert'



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
    textField : {
        width : "720px",
    },
    paper : {
        margin : "20px",
    }
}))


function ListerReclamation() {
    const History = useHistory()
    const classes = useStyles()
    const [reclamations, setreclamation] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [periode, setPeriode] = useState(0)

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

        if(periode === 0){
            if(search !== ""){
                axios.get("/reclamations/" + search)
                .then((response) => {
                    if(response.data.msggg === "No Réclamation"){
                        setMsg("No Réclamation")
                        setreclamation("")
                    }
                    else if(response.data === "Failed to load Data"){
                        setMsg("No Réclamation")
                    }
                    else if(response.data.length > 0){
                        setreclamation(response.data)
                        setMsg("")
                    }
                    else {
                        setreclamation("")
                        setMsg("No Réclamation")
                    }
                })
                .catch(() => {})
            }
            else{
                axios.get("/reclamations/all")
                    .then((response) => {
                        if(response.data.length > 0){
                            setreclamation(response.data)
                        }
                        else{
                            setreclamation([])
                            console.log("No Réclamation")
                        }
                    })
                    .catch(() => {})
            }
        }
        else if(periode === 1 || periode === 3 || periode === 6){
            const datasend = {perd : periode}
            const run3 = axios.post("/reclamations/admin/periode", datasend)
            .then((response) => {
                if(response.data.msgErr === "No Réclamation"){
                    setMsg("No Réclamation")
                    setreclamation("")
                }
                else if(response.data === "No Réclamations"){
                    setMsg("No Réclamation")
                }
                else if(response.data.length > 0){
                    setreclamation(response.data)
                    setMsg("")
                }
                else {
                    setreclamation("")
                    setMsg("No Réclamation")
                }
            })
            .catch(() => {})

            return (() => clearInterval(run3))
        }
    }, [search, History, periode])

    
    const handleUpdateRecla = (refReclamation) => {
        return(
            History.push(`/réclamation/edit/${refReclamation}`)
        )
    }



    return (
        <div>
            <h1 style={{marginLeft : "200px", paddingTop : "55px"}}>Lister Les Réclamations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Réclamations..." required className={classes.textField} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <FormControl className={classes.formControl} style={{width : "100%"}}>
                                <InputLabel InputLabelProps={{ shrink: true,}} id="demo-simple-select-label">Consulter Par Période</InputLabel>
                                <Select style={{width : "100%"}} onChange={e => setPeriode(e.target.value)} displayEmpty className={classes.selectEmpty} defaultChecked={"Toutes Les Réclamations"} defaultValue={0}>  
                                    <MenuItem value={0}>Toutes Les Réclamations</MenuItem>  
                                    <MenuItem value={1}>Le Mois Courant</MenuItem>    
                                    <MenuItem value={3}>Les 3 Mois Précidents</MenuItem>
                                    <MenuItem value={6}>Les 6 Mois Précidents</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div><br/><br/>
            </div>
            {
                msg === "" && 
                <div className="container col-md-8 col-md-offset-2">
                    {
                        reclamations.map((r) => {
                            return(
                                <Grow key={r.RefReclamation} in={useEffect} timeout={1000}>
                                    <Paper elevation={4} className={classes.paper}>
                                        <Accordion className="mb-5 card">
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                <Typography className={classes.heading}> <h5 style={{color : "blue"}}><strong> {r.Objet} </strong></h5>  </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography spacing={3}>
                                                    <Card className={classes.root} elevation={1}>
                                                        <CardHeader action={ <IconButton onClick={ handleUpdateRecla.bind(this, r.RefReclamation) }><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton> } /> 
                                                        <CardContent>
                                                            <div className="row">
                                                                <div className="col-md-6"><Typography variant="inherit" color="textPrimary" style={{color : "silver"}}> Publier par : {r.NomCompte} {r.PrenomCompte} </Typography></div>
                                                                <div className="col-md-6"><Typography variant="inherit" color="textPrimary" style={{color : "silver"}}> l'Etat du Réclamation : {r.statut} </Typography></div>
                                                            </div>
                                                        </CardContent>
                                                        <CardContent>
                                                            <Typography variant="body1" color="textPrimary">
                                                                {r.Message}
                                                            </Typography><br/>
                                                            {
                                                                r.contenu !== null && 
                                                                <div className="overflow">
                                                                    <img className="scaleImg" src={"reclamation support/" + r.contenu} alt={""} style={{width : "200px", height : "200px"}} />
                                                                </div>
                                                            }
                                                        </CardContent><br/>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <CardActions><Typography variant="body2" color="textSecondary"> Cette Réclamation est : {r.pour} </Typography></CardActions>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <CardActions><Typography variant="body2" color="textSecondary"> Date Publication : {r.dateReclamation.replace("T23:00:00.000Z", "")} </Typography></CardActions>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Paper>
                                </Grow>
                            )}
                        )
                    }
                </div>
            }
            {
                msg === "No Réclamation" &&
                <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Réclamation pour cette Recherche "{search}"</strong></Alert></div>
            }
            <br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default ListerReclamation
