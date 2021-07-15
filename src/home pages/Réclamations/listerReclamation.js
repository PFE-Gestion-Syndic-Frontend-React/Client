import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grow, TextField, Avatar, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { UpdateOutlined, CloudDownloadOutlined }from '@material-ui/icons';
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
    const history = useHistory()

    const classes = useStyles()
    const [reclamations, setreclamation] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/reclamations/" + search)
            .then((response) => {
                if(response.data.msggg === "No Réclamation"){
                    setMsg("No Réclamation")
                    setreclamation("")
                    //toast.warn("Aucune Réclamation pour cette Recherche !")
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
            .catch(() => {

            })
        }
        else{
            axios.get("http://localhost:5001/reclamations/all")
                .then((response) => {
                    if(response.data.length > 0){
                        setreclamation(response.data)
                    }
                })
                .catch(() => console.log("No Reclamation"))
        }
    }, [search])

    
    const handleUpdateRecla = (refReclamation) => {
        return(
            history.push(`/réclamation/edit/${refReclamation}`)
        )
    }


    const handleDownload = (contenu) => {

    }

    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px", paddingTop : "9%"}}>Lister Les Réclamations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Réclamations..." required className={classes.textField} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div><br/>
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
                                                                    <div style={{marginLeft : "60px"}} onClick={handleDownload.bind(this, r.contenu)} ><IconButton aria-label="Download" aria-labelledby="Download" ><CloudDownloadOutlined style={{width : "50px", height : "50px"}} /> </IconButton></div>
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
                <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucune Réclamation pour cette Recherche "{search}" </Alert></div>
            }
            <br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default ListerReclamation
