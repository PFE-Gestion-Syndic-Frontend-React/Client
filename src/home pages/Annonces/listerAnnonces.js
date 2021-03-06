import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grow, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { DeleteOutlined, UpdateOutlined }from '@material-ui/icons'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
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
    paper : {
        margin : "20px",
    }
}))



function ListerAnnonces(props) {
    const History = useHistory()
    const classes = useStyles()
    const [annonces, setAnnonce] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [ref, setRef] = useState('')
    const [deleted, setDeleted] = useState('')
    const [periode, setPeriode] = useState(0)

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = (RefAnnonce) => {
        setOpen(true);
        setRef(RefAnnonce)
    };

    const updateAnnonce = (refAnnonce) => {
        return(
            History.push(`/annonce/edit/${refAnnonce}`)
        )
    }


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
                const run = axios.get("/annonces/" + search)
                .then((response) => {
                    if(response.data.msggg === "No Annonce"){
                        setMsg("No Annonce")
                        setAnnonce([])
                    }
                    else if(response.data.length > 0){
                        setAnnonce(response.data)
                        setMsg("")
                    }
                    else{
                        setAnnonce([])
                        setMsg("No Annonce")
                    }
                })
                .catch(() => {
    
                })
                return(() => { clearInterval(run)})
            }
            else{
                const run1 = axios.get("/annonces/all")
                .then((response) => {
                    if(response.data === "Failed to load Data"){
                        setAnnonce([])
                        setMsg("No Annonce")
                    }
                    else if(response.data.length > 0){
                        setAnnonce(response.data)
                        setMsg('')
                    }
                    else{
                        setAnnonce([])
                        setMsg("No Annonce")
                    }
                })
                .catch(() => {})
    
                return(() => { clearInterval(run1)})
            }
        }
        else if(periode === 1 || periode === 3 || periode === 6){
            const datasend = { perd : periode}
            const run3 = axios.post("/annonces/admin/periode", datasend)
            .then((response) => {
                if(response.data === "Failed to load Data"){
                    setAnnonce([])
                    setMsg("No Annonce")
                }
                else if(response.data.length > 0){
                    setAnnonce(response.data)
                    setMsg('')
                }
                else{
                    setAnnonce([])
                    setMsg("No Annonce")
                }
            })
            .catch(() => {})

            return (() => clearInterval(run3))
        }
    }, [search, deleted, msg, History, periode])

    const deleteAnnonce = () => {
        axios.delete(`/annonces/delete/${ref}`)
        .then((response) => {
            if(response){
                if(response.data === "Deleted ALL"){
                    toast.info("L'Annonce a ??t?? Supprim??e avec Succ??s")
                    setDeleted('ok')
                    setMsg("")
                }
                else if(response.data === "Err"){

                }
                else if(response.data === "No Resolving"){
                    toast.warn("Merci de R??ssayer une autre fois ..")
                }
            }
            else{
                toast.info("L'Annonce a ??t?? Supprim??e avec Succ??s")
            }
        })
        .catch(() => {

        })
        setDeleted('ok')
        setMsg("")
        setOpen(false)
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
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <FormControl className={classes.formControl} style={{width : "100%"}}>
                                <InputLabel InputLabelProps={{ shrink: true,}} id="demo-simple-select-label">Consulter Par P??riode</InputLabel>
                                <Select style={{width : "100%"}} onChange={e => setPeriode(e.target.value)} displayEmpty className={classes.selectEmpty} defaultChecked={"Toutes Les Annonces"} defaultValue={0}>  
                                    <MenuItem value={0}>Toutes Les Annonces</MenuItem>  
                                    <MenuItem value={1}>Le Mois Courant</MenuItem>    
                                    <MenuItem value={3}>Les 3 Mois Pr??cidents</MenuItem>
                                    <MenuItem value={6}>Les 6 Mois Pr??cidents</MenuItem>
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
                                                    <h5 style={{color : "blue"}}><Typography className={classes.heading}> <strong>{a.Sujet}</strong></Typography></h5>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={classes.root} >
                                                            <CardHeader action={ <div> <IconButton onClick={ updateAnnonce.bind(this, a.RefAnnonce) }  ><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton><IconButton onClick={ handleClickOpen.bind(this, a.RefAnnonce)}><DeleteOutlined style={{color : "red", fontSize : "30px"}} /> </IconButton> </div> } 
                                                                        subheader={`Publi?? par : ${a.NomCompte} ${a.PrenomCompte}`} />
                                                            <CardContent>
                                                                <Typography variant="body1" color="textPrimary">
                                                                    {a.DescripAnnonce}
                                                                </Typography><br/><br/>
                                                                {
                                                                    a.contenuDocument !== null &&
                                                                    <Typography className="overflow">
                                                                        <img className="scaleImg" src={`annonce doc/${a.contenuDocument}`} alt="" style={{width : "200px", height : "200px"}} />
                                                                    </Typography>
                                                                }
                                                            </CardContent>
                                                            <CardActions>
                                                                <div className="row col-md-12">
                                                                    <div className="col-md-6"><Typography variant="body2" color="textSecondary" style={{marginLeft : "7px"}}> Etat d'Annonce : {a.statut.data[0] === 1 && <span>Visible</span> }  {a.statut.data[0] === 0 && <span>Invisible</span>}</Typography></div>
                                                                    <div className="col-md-6"><Typography variant="body2" color="textSecondary"> Date Publication : {a.dateAnnonce && a.dateAnnonce.replace("T23:00:00.000Z", "")} </Typography></div>
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
                                        </Paper> 
                                    </Grow>
                                )
                            })
                        }
                    </div>
                }
                {
                    search !== "" ?
                    <div>{ msg === "No Annonce" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Annonce Pour Cette Recherche "{search}" </strong></Alert></div>}</div>
                    :
                    <div>{ msg === "No Annonce" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Annonce Pour l'Instant </strong></Alert></div>}</div>
                }
            </div><br/><br/><br/><br/><br/><br/>
        </div>
    )
}

export default ListerAnnonces
