import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DeleteOutlined, UpdateOutlined, CloudDownloadOutlined }from '@material-ui/icons';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import Alert from '@material-ui/lab/Alert'

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
        width: '955px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: (theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: (theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textfield : {
        width : "720px",
    },
}))



function ListerAnnonces(props) {
    const classes = useStyles()
    const [annonces, setAnnonce] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [ref, setRef] = useState('')
    const [deleted, setDeleted] = useState('')

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = (RefAnnonce) => {
        setOpen(true);
        setRef(RefAnnonce)
    };

    const History = useHistory()
    const updateAnnonce = (refAnnonce) => {
        return(
            History.push(`/annonce/edit/${refAnnonce}`)
        )
    }


    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/annonces/" + search)
            .then((response) => {
                if(response.data.msgErr === "No Token Set"){
                    localStorage.clear()
                    History.push('/')
                }
                if(response.data.length > 0){
                    setAnnonce(response.data)
                    setMsg("")
                }
                else {
                    setMsg("No Annonce")
                    setAnnonce(response.data.msggg)
                    //toast.warn("Aucune Annonce pour Cette Recherche !")
                }
            })
            .catch(() => {

            })
        }
        else{
            axios.get("http://localhost:5001/annonces/all")
            .then((response) => {
                if(response.data.msgErr === "No Token Set"){
                    localStorage.clear()
                    History.push('/')
                }
                else if(response.data.length > 0){
                    setAnnonce(response.data)
                }
                else{
                    setMsg("No Annonce")
                }
            })
            .catch(() => 
            {
                
            })
        }
    }, [search, deleted, msg, History])

    const deleteAnnonce = () => {
        axios.delete(`http://localhost:5001/annonces/delete/${ref}`)
        .then((response) => {
            if(response){
                if(response.data === "Deleted ALL"){
                    toast.info("L'Annonce a été Supprimée avec Succès")
                    setDeleted('ok')
                    setMsg("")
                }
                else if(response.data === "Err"){

                }
                else if(response.data === "No Resolving"){
                    toast.warn("Merci de Réssayer une autre fois ..")
                }
            }
            else{
                toast.info("L'Annonce a été Supprimée avec Succès")
            }
        })
        .catch(() => {

        })
        setDeleted('ok')
        setMsg("")
        setOpen(false)
    }


    const handleDownload = (file) => {

    }

    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Annonces</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row"><br/><br/>
                        <div>    
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Annonces..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div><br/><br/>
            </div>
            <div>
                {
                    msg === "" &&
                    <div className="container col-md-8 col-md-offset-2">
                        {
                            annonces.map((a) => {
                                return(
                                    <div>
                                        <Accordion key={a.RefAnnonce} className="mb-5">
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                <Typography className={classes.heading}> <h5 style={{color : "blue"}}><strong>{a.Sujet}</strong></h5>  </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography spacing={3}>
                                                    <Card className={classes.root} elevation={1}>
                                                        <CardHeader action={ <div> <IconButton onClick={ updateAnnonce.bind(this, a.RefAnnonce) }  ><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton><IconButton onClick={ handleClickOpen.bind(this, a.RefAnnonce)}><DeleteOutlined style={{color : "red", fontSize : "30px"}} /> </IconButton> </div> } 
                                                                    subheader={`Publié par : ${a.NomCompte} ${a.PrenomCompte}`} />
                                                        <CardContent>
                                                            <Typography variant="body1" color="textPrimary">
                                                                {a.DescripAnnonce}
                                                            </Typography><br/><br/>
                                                            {
                                                                a.contenuDocument !== null &&
                                                                <Typography>
                                                                     <Avatar src={`annonce doc/${a.contenuDocument}`} alt="" style={{width : "200px", height : "200px"}} />
                                                                    <div style={{marginLeft : "60px"}} onClick={handleDownload.bind(this, a.contenuDocument)} ><IconButton aria-label="Download" aria-labelledby="Download" ><CloudDownloadOutlined style={{width : "50px", height : "50px"}} /> </IconButton></div>
                                                                </Typography>
                                                            }
                                                        </CardContent>
                                                        <CardActions>
                                                            <div className="row col-md-12">
                                                                <div className="col-md-6"><Typography variant="body2" color="textSecondary" component="p" style={{marginLeft : "7px"}}> Etat d'Annonce : {a.statut.data[0] === 1 && <span>Visible</span> }  {a.statut.data[0] === 0 && <span>Invisible</span>}  </Typography></div>
                                                                <div className="col-md-6"><Typography variant="body2" color="textSecondary" component="p"> Date Publication : {a.dateAnnonce.replace("T23:00:00.000Z", "")} </Typography></div>
                                                            </div>
                                                        </CardActions>
                                                        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                                            <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la Suppression d'une Annonce ?"}</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                    Est ce que Voulez-Vous de SUPPRIMER Cette Annonce ?
                                                                </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose} color="primary">Cancel</Button>
                                                                <Button onClick={deleteAnnonce.bind(this, a.NumCompte)} color="secondary" autoFocus>Oui, Je Supprime !</Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </Card>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    msg === "No Annonce" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucune Annonce Pour Cette Recherche "{search}" </Alert></div>
                }
            </div>
            
        </div>
    )
}

export default ListerAnnonces
