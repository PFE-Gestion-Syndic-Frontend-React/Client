import React, { useEffect, useState } from 'react'
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteOutlined, UpdateOutlined }from '@material-ui/icons';
import axios from 'axios';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';

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
        width: '962px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
    textfield : {
        width : "720px",
    },
}))



function ListerCotisation() {
    const classes = useStyles()
    const history = useHistory()
    const [msg, setMsg] = useState('')
    const [cotisations, setCotisation] = useState([])
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    //const [deleted, setDeleted] = useState('')

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/cotisations/" + search)
            .then((response) => {
                if(response.data.msgErr === "No Token Set"){
                    localStorage.clear()
                    History.push('/')
                }
                else if(response.data === "No Paiements"){
                    setMsg("No Cotisation")
                }
                else if(response.data.length > 0){
                    setCotisation(response.data)
                    setMsg("")
                }
            })
            .catch((err) => {
                console.log(err)
                setMsg("No Cotisation")
            })
        }
        else{
            axios.get("http://localhost:5001/cotisations/all")
            .then((response) => {
                if(response.data.msgErr === "No Token Set"){
                    localStorage.clear()
                    History.push('/')
                }
                if(response.data.length > 0){
                    setCotisation(response.data[0])
                }
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }
    },[search])

    const updateCotisation = (RefCotisation) => {
        history.push('/cotisation/edit/' + RefCotisation)
    }

    const deleteCotisation = (RefCotisation) => {
        setOpen(false)
    }

    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Cotisations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Cotisations..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div><br/>
            </div>
            <div className="container col-md-8 col-md-offset-2">
                {
                    msg === "" &&
                    <div className="">
                        {
                            cotisations.map((c) => {
                                return(
                                    <div>
                                        <Accordion key={c.RefPaiement} className="mb-5">
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                <Typography className={classes.heading}> <h5><strong> Cotisation du <span style={{color : "blue"}}>{c.NomCompte} {c.PrenomCompte}</span>  </strong></h5>  </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography spacing={3}>
                                                    <Card className={classes.root} elevation={1}>
                                                        <CardHeader action={ <div> <IconButton onClick={ updateCotisation.bind(this, c.RefPaiement) }  ><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton><IconButton onClick={ handleOpen }><DeleteOutlined style={{color : "red", fontSize : "30px"}} /> </IconButton> </div> } 
                                                                    subheader={`Référence :  ${c.RefPaiement}`} />
                                                        <CardContent>
                                                            <Typography variant="body1" color="textPrimary">
                                                                <div className="row" >
                                                                    <div className="col-md-6"> Méthode de Paiement : {c.MethodePaiement} </div>
                                                                    <div className="col-md-6"> Montant à Payer : <strong style={{color : "blue"}}> {c.Montant} (en MAD) X {c.NbrMois} Mois  </strong></div><br/>
                                                                </div>
                                                                {
                                                                    c.MethodePaiement === "Chèque" && 
                                                                    <div className="row">
                                                                        <div className="col-md-6">Numéro du Chèque : <strong>{c.NumeroCheque}</strong>  </div>
                                                                        <div className="col-md-6">Banque : <strong>{c.Banque}</strong>  </div><br/>
                                                                    </div>
                                                                }
                                                                <div className="row">
                                                                    <div className="col-md-6">Du : <strong>{c.Du.replace("T23:00:00.000Z", "")} </strong>  </div>
                                                                    <div className="col-md-6">Au : <strong>{c.Au.replace("T23:00:00.000Z", "")}</strong>  </div>
                                                                </div>
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Typography variant="body2" color="textSecondary" component="p"> Date Paiement : {c.datePaiement.replace("T23:00:00.000Z", "")} </Typography>
                                                        </CardActions>
                                                    </Card>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                            <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la Suppression d'une Annonce ?"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Est ce que Voulez-Vous de SUPPRIMER Cette Cotisation ?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary">Cancel</Button>
                                                <Button onClick={deleteCotisation.bind(this, c.RefPaiement)} color="secondary" autoFocus>Oui, Je Supprime !</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    msg === "No Cotisation" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucune Cotisation Pour Cette Recherche "{search}"</Alert></div>
                }
            </div>
        </div>
    )
}

export default ListerCotisation
