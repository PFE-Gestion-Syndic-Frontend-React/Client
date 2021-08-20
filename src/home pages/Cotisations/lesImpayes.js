import React, { useEffect, useState } from 'react'
import { Paper, Grow, TextField, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Card, CardHeader, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Alert from '@material-ui/lab/Alert'
import { useHistory } from 'react-router'
import { PrintOutlined }from '@material-ui/icons';
import { saveAs} from 'file-saver'

const useStyles = makeStyles((theme) => ({
    textfield : {
        width : "740px",
    },
    root : {
        width : "955px",
    },
}))


function LesImpayes() {
    const History = useHistory()
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [impaye, setImpaye] = useState([])
    const [neverPaied, setNeverPaied] = useState([])
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
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

        if(search !== ""){
            const run = axios.get("/cotisations/getImpayes/" + search)
            .then((resolve) => {
                if(resolve.data === 'Not Found'){
                    setImpaye([])
                    setNeverPaied([])
                    setMsg('Not Found')
                }
                else if(resolve.data.res1.length > 0 && resolve.data.res2.length > 0){
                    setImpaye(resolve.data.res1)
                    setNeverPaied(resolve.data.res2)
                    setMsg('')
                }
                else if(resolve.data.res1.length === 0 && resolve.data.res2.length > 0){
                    setNeverPaied(resolve.data.res2)
                    setMsg('')
                }
                else if(resolve.data.res1.length > 0 && resolve.data.res2.length === 0){
                    setImpaye(resolve.data.res1)
                    setMsg('')
                }
                else{
                    setImpaye([])
                    setNeverPaied([])
                    setMsg('Not Found')
                }
            })
            .catch(() => {})

            return (() => clearInterval(run))
        }
        else{
            const run1 = axios.get("/cotisations/getImpayes")
            .then((resolve) => {
                if(resolve.data === 'Not Found'){
                    setImpaye([])
                    setMsg('Not Found')
                }
                else if(resolve.data.res1.length > 0 && resolve.data.res2.length > 0){
                    setImpaye(resolve.data.res1)
                    setNeverPaied(resolve.data.res2)
                    setMsg('')
                }
                else if(resolve.data.res1.length === 0 && resolve.data.res2.length > 0){
                    setNeverPaied(resolve.data.res2)
                    setMsg('')
                }
                else if(resolve.data.res1.length > 0 && resolve.data.res2.length === 0){
                    setImpaye(resolve.data.res1)
                    setMsg('')
                }
                else{
                    setImpaye([])
                    setNeverPaied([])
                    setMsg('Not Found')
                }
            })
            .catch(() => {})
            return(() => clearInterval(run1))
        }
    }, [search, msg, History])
    
    const handleDownload = (never, imp) => {
        axios.post("/cotisations/impaye/create-pdf")
        .then(() => axios.get("/cotisations/impaye/fetch-pdf", { responseType : "blob"}))
        .then((resolve) => {
            const blob  = new Blob([resolve.data], {type : 'application/pdf'})
            saveAs(blob, `Lister les Impayés.pdf`)
        })
        .catch(() => {})
    }
    
    return (
        <div style={{top : "90px"}}><br/><br/>
            <Button variant="text"  color="primary" style={{marginLeft : "970px", width : "500px", textTransform : "capitalize", fontSize : "16px"}} onClick={handleOpen}><span><i className="bi bi-table" style={{paddingRight : "15px"}}></i></span>  Consulter Les Impayés d'une façon structurer </Button>
            <h1 style={{marginLeft : "200px"}}>Lister Les Impayés</h1>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Impayés..." required className={classes.textfield} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div><br/>
            </div><br/>
            <div className="container col-md-8 col-md-offset-2" style={{marginRight : "15%"}}>
            {
                msg === "" &&
                <div className="">
                    {
                        neverPaied.length > 0 &&
                        neverPaied.map((c, i) => {
                            return(
                                <Grow key={i} in={useEffect} timeout={2000}>
                                    <Paper>
                                        <div className="">
                                            <Accordion className="mb-5">
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                    <Typography className={classes.heading}> <h5><strong> Le Copropriétaire : <span style={{color : "blue"}}>{c.NomCompte} {c.PrenomCompte}</span>  </strong></h5>  </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={classes.root}>
                                                            <CardHeader subheader={`Logement :  ${c.RefLogement}`} />
                                                            <CardContent>
                                                                <Typography variant="body1" color="textPrimary">
                                                                    <div className="row" >
                                                                        <div className="col-md-6"> E-mail : <strong>{c.EmailCompte}</strong></div>
                                                                        <div className="col-md-6"> Téléphone : <strong> {c.telephone}  </strong></div>
                                                                    </div><br/>
                                                                    <div className="row">
                                                                        <div className="col-md-6">La Periode Impayés : <strong style={{color : "red"}}>{c.periode} mois</strong></div>
                                                                        <div className="col-md-6">Au : <strong style={{color : "red"}}>{c.todate && c.todate.replace("T23:00:00.000Z", "")}</strong></div><br/>
                                                                    </div><br/> 
                                                                    <div className="row">
                                                                        <div><h3>Le Montant à Payer est : <strong style={{color : "red"}}> {200 * c.periode} MAD </strong> </h3> </div>
                                                                    </div>
                                                                </Typography>
                                                            </CardContent>
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
                    {
                        impaye.length > 0 &&
                        impaye.map((c, i) => {
                            return(
                                <Grow key={i} in={useEffect} timeout={2000}>
                                    <Paper>
                                        <div className="">
                                            <Accordion className="mb-5">
                                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                                    <Typography className={classes.heading}> <h5><strong> Le Copropriétaire : <span style={{color : "blue"}}>{c.NomCompte} {c.PrenomCompte}</span>  </strong></h5>  </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography spacing={3}>
                                                        <Card className={classes.root}>
                                                            <CardHeader subheader={`Logement :  ${c.RefLogement}`} />
                                                            <CardContent>
                                                                <Typography variant="body1" color="textPrimary">
                                                                    <div className="row" >
                                                                        <div className="col-md-6"> E-mail : <strong>{c.EmailCompte}</strong></div>
                                                                        <div className="col-md-6"> Téléphone : <strong> {c.telephone}  </strong></div>
                                                                    </div><br/>
                                                                    <div className="row" >
                                                                        <div className="col-md-6"> Le Dernier Paiement : <strong>{c.du && c.du.replace("T23:00:00.000Z", "")}</strong>  </div>
                                                                        <div className="col-md-6"> Fait le : <strong> {c.datePaiement && c.datePaiement.replace("T23:00:00.000Z", "")}  </strong></div><br/>
                                                                    </div><br/>
                                                                    <div className="row">
                                                                        <div>La Méthode du Dernier Paiement effectué : <strong> {c.MethodePaiement === "Chèque" ? "par Chèque" : "en Espèce"}  </strong> </div>
                                                                    </div><br/>
                                                                    <div>
                                                                        {
                                                                            c.MethodePaiement === "Chèque" && 
                                                                            <div className="row">
                                                                                <div className="col-md-6">Numéro du Chèque : <strong>{c.NumeroCheque}</strong></div>
                                                                                <div className="col-md-6">Banque : <strong>{c.Banque}</strong></div><br/>
                                                                            </div>
                                                                        }
                                                                        <br/>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6">La Periode Impayés : <strong style={{color : "red"}}>{c.periode} mois</strong></div>
                                                                        <div className="col-md-6">Au : <strong style={{color : "red"}}>{c.todate && c.todate.replace("T23:00:00.000Z", "")}</strong></div><br/>
                                                                    </div><br/> 
                                                                    <div className="row">
                                                                        <div><h3>Le Montant à Payer est : <strong style={{color : "red"}}> {200 * c.periode} MAD </strong> </h3> </div>
                                                                    </div>
                                                                </Typography>
                                                            </CardContent>
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
                </div>
            }
            {
                search !== "" ?
                <div>{ msg === "Not Found" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucun Résultat Pour Cette Recherche "{search}"</strong></Alert></div> }</div>
                :
                <div>{ msg === "Not Found" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="success"><strong style={{fontSize : "18px"}}>Tous les Copropriétaires ont Payées leurs Cotisations</strong></Alert></div> }</div>
            }
            </div><br/><br/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" maxWidth="lg" fullWidth={true}>
                <DialogTitle id="alert-dialog-title" style={{textAlign : "center", color : "blue", fontSize : "26px"}}>{"Liste des Impayés"}</DialogTitle>
                <DialogContent><br/>
                    <DialogContentText id="alert-dialog-description">
                        <table className="table table-hover">
                            <thead>
                                <tr className="thead-light">
                                    <th>Nom et Prénom</th>
                                    <th>N° Téléphone</th>
                                    <th>Libellé Logement</th>
                                    <th>Montant à Payer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    neverPaied.length > 0 && 
                                    neverPaied.map((c, i) => {
                                        return(
                                            <tr key={i + c.RefLogement}>
                                                <td style={{width : "260px"}}> {c.NomCompte} {c.PrenomCompte} </td>
                                                <td style={{width : "140px"}}> {c.telephone} </td>
                                                <td style={{width : "200px"}}> {c.RefLogement} </td>
                                                <td style={{width : "200px"}}> <strong style={{color : "blue"}}>{c.periode * 200}</strong> MAD</td>
                                            </tr>
                                        )}
                                    )
                                }
                                {
                                    impaye.length > 0 && 
                                    impaye.map((p, i) => {
                                        return(
                                            <tr key={i + p.RefLogement}>
                                                <td style={{width : "260px"}}> {p.NomCompte} {p.PrenomCompte} </td>
                                                <td style={{width : "140px"}}> {p.telephone} </td>
                                                <td style={{width : "200px"}}> {p.RefLogement} </td>
                                                <td style={{width : "200px"}}> <strong style={{color : "blue"}}>{p.periode * 200}</strong> MAD</td>
                                            </tr>
                                        )}
                                    )
                                }
                            </tbody>
                        </table>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" style={{fontSize : "20px"}}>Cancel</Button>
                    <IconButton id="contenu" onClick={handleDownload.bind(this, {neverPaied, impaye})}><PrintOutlined style={{color : "blue", fontSize : "50px"}} /></IconButton>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default LesImpayes
