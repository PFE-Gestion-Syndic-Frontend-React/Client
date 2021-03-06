import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Paper, Grow, TextField, Accordion, AccordionSummary, Typography, AccordionDetails, Button, IconButton, Card, CardContent, CardActions, CardHeader, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { UpdateOutlined, DeleteOutlined } from '@material-ui/icons'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import { useHistory } from 'react-router'
import {toast} from 'react-toastify'
import Alert from '@material-ui/lab/Alert'



const useStyles = makeStyles((theme) => ({
    alert :{
        flexDirection: 'column',
        width : "150vh",
        '& > *': {
            textAlign : 'center',
            alignItems: 'center',
        },
    },
    root: {
        width: '915px',
    },
    textfield : {
        width : "720px",
    },
    paper: {
        margin: "20px",
    },
}))


function ListerDepense(props) {
    const History = useHistory()
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [depense, setDepense] = useState([]) 
    const [msg, setMsg] = useState('')
    const [deleted, setDeleted] = useState('')
    const [open, setOpen] = useState(false)
    const [refDep, setRefDep] = useState('')
    const [periode, setPeriode] = useState(0)

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = (Dep) => {
        setRefDep(Dep)
        setOpen(true)
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
                const run = axios.get("/depenses/" + search)
                .then((response) => {
                    if(response.data.msgErr === "No Token Set"){
                        localStorage.clear()
                        History.push('/')
                    }
                    else if(response.data === "No D??pense"){
                        setDepense([])
                        setMsg("No D??pense")
                    }
                    else if(response.data.length > 0){
                        setDepense(response.data)
                        setMsg("data")
                    }
                    else{
                        setDepense([])
                        setMsg("No D??pense")
                    }
                })
                .catch(() => {})
    
                return(() => clearInterval(run))
            }
            else{
                const run1 = axios.get("/depenses/all")
                .then((response) => {
                    if(response.data){
                        if(response.data === "No D??pense"){
                            setDepense([])
                            setMsg("No D??pense")
                        }
                        else if(response.data.length > 0){
                            setDepense(response.data)
                            setMsg("data")
                        }
                        else {
                            setDepense([])
                            setMsg("No D??pense")
                        }
                    }
                })
                .catch(() => {})
    
                return (() => clearInterval(run1))
            }
        }
        else if(periode === 1 || periode === 3 || periode === 6){
            const datasend = {perd : periode}
            const run3 = axios.post("depenses/periode", datasend)
            .then((res)=>{
                if(res.data){
                    if(res.data === "No D??pense"){
                        setDepense([])
                        setMsg("No D??pense")
                    }
                    else if(res.data.length > 0){
                        setDepense(res.data)
                        setMsg("data")
                    }
                    else {
                        setDepense([])
                        setMsg("No D??pense")
                    }
                }
                else{
                    setMsg("No D??pense")
                }
            })
            .catch((er) => {console.log(er)})

            return (() => clearInterval(run3))
        }
    }, [search, msg, deleted, History, periode])

    const deleteDepense = (RefDepense) => {
        if(RefDepense !== "" && RefDepense !== undefined){
            axios.delete(`/depenses/delete/${RefDepense}`)
            .then((resolve) => {
                if(resolve.data === "Deleted"){
                    toast.info("La D??pense a ??t?? Supprim??e avec Succ??s")
                }
                else if(resolve.data === "No Resolving"){
                    toast.warning("La Suppression est ??chou??")
                }
            })
            .catch(() => {})
            setMsg("")
            setDeleted("ok")
        }
        setOpen(false)
    }

    const updateDepense = (RefDepense) => {
        return(
            History.push(`/d??pense/edit/${RefDepense}`)
        )
    }


    return (
        <div style={{paddingTop : "1px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les D??penses</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les D??penses..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <FormControl className={classes.formControl} style={{width : "100%"}}>
                                <InputLabel InputLabelProps={{ shrink: true,}} id="demo-simple-select-label">Consulter Par P??riode</InputLabel>
                                <Select style={{width : "100%"}} onChange={e => setPeriode(e.target.value)} displayEmpty className={classes.selectEmpty} defaultChecked={"Toutes Les D??penses"} defaultValue={0}>  
                                    <MenuItem value={0}>Toutes Les D??penses</MenuItem>  
                                    <MenuItem value={1}>Le Mois Courant</MenuItem>    
                                    <MenuItem value={3}>Les 3 Mois Pr??cidents</MenuItem>
                                    <MenuItem value={6}>Les 6 Mois Pr??cidents</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div><br/>
            </div>
            {
                msg === "data" &&
                <div className="container col-md-8 col-md-offset-2">    
                    {
                        depense.map((d) => {
                            return(
                                <Grow key={d.RefDepense} in={useEffect} timeout={1000}>
                                    <Paper elevation={4} className={classes.paper}>
                                        <div >
                                            <Accordion key={d.RefDepense} className="mb-5 card">
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                    <Typography className={classes.heading} style={{color : "blue"}}><strong> {d.descriptionDepense} </strong></Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={ classes.root}>
                                                            <CardHeader action={ <div> <IconButton onClick={ updateDepense.bind(this, d.RefDepense)} ><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton><IconButton onClick={handleOpen.bind(this, d.RefDepense)}><DeleteOutlined style={{color : "red", fontSize : "30px"}} /></IconButton></div> } />
                                                            <CardContent>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <Typography variant="body1" color="textPrimary">La Categorie : <strong>{d.NomCategorie}</strong> </Typography>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <Typography variant="body1" color="textPrimary">Montant : <strong style={{color : "blue"}}>{d.MontantDepense} (en Dhs)</strong></Typography>
                                                                    </div>
                                                                </div><br/>
                                                                <Typography > Facture : {d.facture} </Typography>
                                                            </CardContent>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <CardActions><Typography variant="body2" color="textSecondary" style={{marginLeft : "7px"}}>D??clarer par : {d.NomCompte} {d.PrenomCompte} </Typography></CardActions>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <CardActions><Typography variant="body2" color="textSecondary">Date mise ?? jour : {d.dateDepense && d.dateDepense.replace("T23:00:00.000Z", "")} </Typography></CardActions>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </Paper>
                                </Grow>
                            )
                        })
                    }
                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la suppression d'une D??pense ?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Confirmez-vous la SUPPRESSION du cette D??pense ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                            <Button onClick={deleteDepense.bind(this, refDep)}  color="secondary" autoFocus>Oui, Je Confirme !</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            }
            {
                search !== "" ?
                <div>{ msg === "No D??pense" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune D??pense Pour Cette Recherche "{search}"</strong></Alert></div> }</div>
                :
                <div>{ msg === "No D??pense" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucune D??pense Pour l'Instant</strong></Alert></div> }</div>
            }
            
        </div>
    )
}

export default ListerDepense
