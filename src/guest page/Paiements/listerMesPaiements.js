import React, { useEffect, useState } from 'react'
import { Paper, Grow, TextField, Accordion, AccordionSummary, AccordionDetails, Button, IconButton, Typography, Card, CardContent, CardActions, DialogActions, Dialog, DialogContentText, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router'
import { PrintOutlined }from '@material-ui/icons';
import { saveAs} from 'file-saver'

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
        width: '921px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
    paper : {
        margin : "20px",
    },
    textfield : {
        width : "750px",
    },
    formControl: {
        margin: theme.spacing(1),
        width: 400,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))


function ListerMesPaiements() {
    const History = useHistory()
    const classes = useStyles()
    const [msg, setMsg] = useState('')
    const [cotisations, setCotisation] = useState([])
    const [search, setSearch] = useState('')
    const id = localStorage.getItem('id')
    const [logs, setLogs] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedLog, setSelectedLog] = useState('')
    const [cots, setCots] = useState('')
    const [oneLog, setOneLog] = useState('')
    const [cot, setCot] = useState('')

    const handleOpen = () => {
        setOpen(true)
        axios.get(`/users/coproprietaire/logs/${id}`)
        .then((res) => {
            if(res.data === "No Log"){
                setLogs("No Log")
            }
            else if(res.data.length === 1){
                setLogs(res.data)
                setOneLog(res.data[0].RefLogement)
            }
            else if(res.data.length > 1){
                setLogs(res.data)
            }
        })
        .catch(() => {})
    }
    const handleClose = () => {
        setSelectedLog('')
        setOpen(false)
    }

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

        if(id !== undefined && id !== ""){
            if(search !== ""){
                axios.get(`/cotisations/mesCotisations/${id}/${search}`)
                .then((response) => {
                    if(response.data === "No Token at all" || response.data === "Invalid Token"){
                        localStorage.clear()
                        History.push('/')
                    }
                    else if(response.data === "No Cotisation"){
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                    else if(response.data.length !== 0){
                        setCotisation(response.data)
                        setMsg("")
                    }
                    else{
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                })
                .catch((err) => { console.log(err) })
            }
            else{
                axios.get(`/cotisations/mesCotisations/${id}`)
                .then((response) => {
                    if(response.data === "No Token at all" || response.data === "Invalid Token"){
                        localStorage.clear()
                        History.push('/')
                    }
                    else if(response.data === "No Cotisation"){
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                    else if(response.data.length !== 0){
                        setCotisation(response.data)
                        setMsg("")
                    }
                    else{
                        setCotisation([])
                        setMsg("No Cotisation")
                    }
                })
                .catch(() => {})
            }
        }
        else{
            console.log("HEHO ANY ID !")
        }


        if(selectedLog !== ""){
            const runIt = axios.get(`/cotisations/mesCotisations/${selectedLog}/${id}`)
            .then((res) => {
                if(res.data === "No Cotisation"){
                    setCots('No Cotisation')
                }
                else {
                    setCots(res.data)
                }
            })
            .catch(() => {})

            return (() => clearInterval(runIt))
        }
        else if(oneLog !== ""){
            const runItOne = axios.get(`/cotisations/mesCotisations/${oneLog}/${id}`)
            .then((res) => {
                if(res.data === "No Cotisation"){
                    setCot('No Cotisation')
                }
                else {
                    setCot(res.data)
                }
            })
            .catch(() => {})

            return (() => clearInterval(runItOne))
        }
    },[search, id, History, selectedLog, oneLog])

    const handlePrint = (data) => {
        const datasend = {data : data}
        axios.post("/cotisations/maSituation/create-pdf", datasend)
        .then(() => axios.get("/cotisations/maSituation/fetch-pdf", { responseType : "blob"}))
        .then((resolve) => {
            const blob  = new Blob([resolve.data], {type : 'application/pdf'})
            saveAs(blob, `Ma Situation Financière.pdf`)
        })
        .catch(() => {})
    }

    return (
        <div style={{top : "120px"}}>
            {
                logs !== "No Log" &&
                <Button variant="text"  color="primary" style={{marginLeft : "1100px", width : "300px", textTransform : "capitalize", fontSize : "16px"}} onClick={handleOpen}><span><i className="bi bi-wallet" style={{paddingRight : "15px"}}></i></span>Ma situation Financière</Button>
            }
            <h1 style={{marginLeft : "200px"}}>Lister Les Cotisations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Cotisations..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/>
                </div><br/>
            </div><br/>
            <div className="container col-md-8 col-md-offset-2">
                {
                    msg === "" &&
                    <div className="">
                        {
                            cotisations.map((c) => {
                                return(
                                    <Grow key={c.RefPaiement} in={useEffect} timeout={1000}> 
                                        <Paper elevation={4} className={classes.paper}>
                                            <Accordion className="mb-5 card">
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                    <Typography className={classes.heading}> <h5 style={{color : "blue"}}><strong> Cotisation du {c.datePaiement && c.datePaiement.replace("T23:00:00.000Z", "")} </strong></h5>  </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={classes.root} elevation={1}>
                                                            <CardContent>
                                                                <Typography variant="body1" color="textPrimary">
                                                                    <div className="row text-muted"><strong>Logement :  {c.RefLogement} </strong></div>
                                                                    <div className="row" >
                                                                        <div className="col-md-6"> Méthode de Paiement : {c.MethodePaiement} </div>
                                                                        <div className="col-md-6"> Montant à Payer : <strong style={{color : "blue"}}> {c.Montant} (en MAD) X {c.NbrMois} Mois</strong></div><br/>
                                                                    </div>
                                                                    {
                                                                        c.MethodePaiement === "Chèque" && 
                                                                        <div className="row">
                                                                            <div className="col-md-6">Numéro du Chèque : <strong>{c.NumeroCheque}</strong></div>
                                                                            <div className="col-md-6">Banque : <strong>{c.Banque}</strong>  </div><br/>
                                                                        </div>
                                                                    }
                                                                    <div className="row">
                                                                        <div className="col-md-6">Du : <strong>{c.Du && c.Du.replace("T23:00:00.000Z", "")}</strong></div>
                                                                        <div className="col-md-6">Au : <strong>{c.Au && c.Au.replace("T23:00:00.000Z", "")}</strong></div>
                                                                    </div>
                                                                </Typography>
                                                            </CardContent>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <CardActions><Typography variant="body2" color="textSecondary" style={{marginLeft : "7px"}}>Déclarer Par : {c.NomCompte} {c.PrenomCompte}</Typography></CardActions>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <CardActions><Typography variant="body2" color="textSecondary">Date Paiement : {c.datePaiement && c.datePaiement.replace("T23:00:00.000Z", "")}</Typography></CardActions>
                                                                </div>
                                                            </div>
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
                    search === "" ?
                    <div>{ msg === "No Cotisation" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}> Vous n'avez Aucune Cotisation Pour l'Instant </strong></Alert></div> }</div>
                    :
                    <div>{msg === "No Cotisation" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune Cotisation Pour Cette Recherche "{search}" </strong></Alert></div> }</div>
                }
            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth="lg" fullWidth={true}>
                <DialogTitle id="alert-dialog-title" style={{textAlign : "center", color : "blue", fontSize : "34px"}}>{"Situation Financière"}</DialogTitle>
                <DialogContent><br/>
                    {
                        logs.length > 1 && 
                        <div className="row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <FormControl className={classes.formControl}>
                                    <InputLabel shrink id="demo-simple-select-placeholder-label-label">Libellé Logement</InputLabel>
                                    <Select style={{width : "100%"}} className={classes.selectEmpty} id="Libellé Logement" label="Libellé Logement" onChange={e => setSelectedLog(e.target.value)}>
                                        {
                                            logs.map((l, i) => {
                                                return(
                                                    <MenuItem key={i}  value={`${l.RefLogement}`}> {l.RefLogement} </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-4"></div>
                            <br/><br/><br/>
                        </div>
                    }
                    <DialogContentText id="alert-dialog-description">
                        {
                            logs.length > 1 &&
                            <div>
                                {
                                    selectedLog !== "" &&
                                    <table className="table table-hover">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Réf Cotisation</th>
                                                <th>Nombre Mois</th>
                                                <th>Montant Payer</th>
                                                <th>Méthode Paiement</th>
                                                <th>Du</th>
                                                <th>Au</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cots.length > 0 &&
                                                cots.map((c, i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td> {c.RefPaiement} </td>
                                                            <td style={{textAlign : "center"}}> {c.NbrMois} </td>
                                                            <td style={{textAlign : "center"}}> {c.Montant} </td>
                                                            <td style={{textAlign : "center"}}> {c.MethodePaiement} </td>
                                                            <td style={{textAlign : "left"}}> {c.Du && c.Du.replace("T23:00:00.000Z", "")} </td>
                                                            <td style={{textAlign : "left"}}> {c.Au && c.Au.replace("T23:00:00.000Z", "")} </td>
                                                        </tr>
                                                    )
                                                })
                                            } 
                                        </tbody>
                                    </table>
                                }
                            </div>
                        }
                        {
                            logs.length === 1 && 
                            <div>
                                {
                                    oneLog !== "" &&
                                    <table className="table table-hover">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Réf Cotisation</th>
                                                <th>Nombre Mois</th>
                                                <th>Montant Payer</th>
                                                <th>Méthode Paiement</th>
                                                <th>Du</th>
                                                <th>Au</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cot.length !== 0 &&
                                                cot.map((c, i) => {
                                                    return(
                                                        <tr key={i}>
                                                            <td> {c.RefPaiement} </td>
                                                            <td style={{textAlign : "center"}}> {c.NbrMois} </td>
                                                            <td style={{textAlign : "center"}}> {c.Montant} </td>
                                                            <td style={{textAlign : "center"}}> {c.MethodePaiement} </td>
                                                            <td style={{textAlign : "left"}}> {c.Du && c.Du.replace("T23:00:00.000Z", "")} </td>
                                                            <td style={{textAlign : "left"}}> {c.Au && c.Au.replace("T23:00:00.000Z", "")} </td>
                                                        </tr>
                                                    )
                                                })
                                            } 
                                        </tbody>
                                    </table>
                                }
                            </div>
                        }
                        {
                            logs.length === 0 &&
                            <div>
                                <Alert severity="error">Vous n'avez aucun Logement ! Consulter l'Administration du Syndic</Alert>
                            </div>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" style={{fontSize : "20px"}}>Cancel</Button>
                    {
                        logs.length === 1 &&
                        <IconButton id="contenu" onClick={handlePrint.bind(this, cot)}><PrintOutlined style={{color : "blue", fontSize : "50px"}} /></IconButton>
                    }
                    {
                        logs.length > 1 &&
                        <IconButton id="contenu" onClick={handlePrint.bind(this, cots)}><PrintOutlined style={{color : "blue", fontSize : "50px"}} /></IconButton>
                    }
                    {
                        logs.length === 0 &&
                        <IconButton id="contenu"><PrintOutlined style={{color : "blue", fontSize : "50px"}} /></IconButton>
                    }
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ListerMesPaiements
