import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { UpdateOutlined }from '@material-ui/icons';
import { useHistory } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';




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
        width: '955px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
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
                if(response.data.length > 0){
                    setreclamation(response.data)
                    setMsg("")
                }
                else {
                    setMsg("No reclamation")
                    setreclamation(response.data.msggg)
                    toast.warn("Aucune Réclamation pour cette Recherche !")
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

    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px", paddingTop : "9%"}}>Lister Les Réclamations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher Les Réclamations..." className="form-control" onChange={e => setSearch(e.target.value)}  />
                        </div>
                    </div><br/><br/>
                </div>
            </div>

            {
                msg === "" && 
                <div className="container col-md-8 col-md-offset-2">
                    {
                        reclamations.map((r) => {
                            return(
                                <Accordion key={r.RefReclamation} className="mb-5">
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
                                                        r.contenu !== "" && 
                                                        <div>
                                                            <Avatar src={"public/reclamation support/" + r.contenu} alt={""} style={{width : "200px", height : "200px"}} />
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
                            )}
                        )
                    }
                </div>
            }
        </div>
    )
}

export default ListerReclamation
