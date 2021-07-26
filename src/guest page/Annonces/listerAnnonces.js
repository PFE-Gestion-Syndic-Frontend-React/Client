import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grow, TextField, IconButton, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, CardActions } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { CloudDownloadOutlined }from '@material-ui/icons'
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
            .catch((err) => {
                console.log(err)
            })
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
            .catch(() => 
            {
                
            })
        }
    }, [search, History])


    const handleDownload = (fileName) => {
        console.log(fileName)
    }

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
                </div>
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
                                                                        <div style={{marginLeft : "60px"}} onClick={handleDownload.bind(this, a.contenuDocument)} ><IconButton aria-label="Download" aria-labelledby="Download" ><CloudDownloadOutlined style={{width : "50px", height : "50px"}} /> </IconButton></div>
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
