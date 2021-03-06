import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { InputLabel, Button, MenuItem, Select, FormControl, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { toast } from 'react-toastify';




const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop : theme.spacing(1),
      textAlign : 'center',
      width: "95%",
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 320,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 320,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));

function AddDepense(props) {
    const History = useHistory()
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState('');
    const [typeDep, setTypeDep] = useState('')
    const [montant, setMontant] = useState('')
    const [fact, setFact] = useState('')
    const [detail, setDetail] = useState('')
    const [categorie, setCategorie] = useState('')
    const [mc, setMC] = useState('')
    const [msg, setMsg] = useState('')
    const id = localStorage.getItem('id')
    const [open, setOpen] = useState(false)
    const [addCat, setAddCat] = useState('')
    const [added, setAdded] = useState('')

    if(msg){}

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
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

        axios.get("/depenses/categorie/all")
        .then((resolve) => {
            setCategorie(resolve.data)
            setMC('Cool')
        })
        .catch((err) => {
            setCategorie(err)
            setMC('')
        })
    }, [added, History])


    const AddCategorie = () => {
        if(addCat !== ""){
            const datasend = {cat : addCat}
            axios.post("/depenses/categorie/new", datasend)
            .then((resolve) => {
                if(resolve.data.duplicate === "cette categorie d??j?? existe"){
                    toast.error("Cette Cat??gorie D??j?? Existe")
                }
                else if(resolve.data.messageErr === "bad"){

                }
                else if(resolve.data.message === "Inserted"){
                    toast.success("La Cat??gorie est Enregistr??e avec Succ??s")
                    setAdded(addCat)
                }
            })
            .catch(() => {})
        }
        setOpen(false)
    }


    const EnregistrerDepense = () => {
        if(id !== null && id !== undefined){
            if(typeDep === "" || !typeDep){
                toast.warn("Merci de S??lectionner une Cat??gorie")
            }
            else{
                if(typeDep !== "" && montant !== "" && fact !== "" && detail !== ""){
                    if(selectedDate !== ''){
                        const datasend = {id : id, typeDepense : typeDep, date : selectedDate, montant : montant, fact : fact, detail : detail}
                        axios.post("/depenses/new", datasend)
                        .then((resolve) => {
                            if(resolve.data.message === "Inserted"){
                                setMsg("La d??pense est enregistr?? avec Success")
                                props.history.push('/d??penses')
                                toast.success("La D??pense est Enregistr??e avec Succ??s")
                            }
                            else if(resolve.data.messageErr === "bad"){
                                setMsg("Really Bad")
                                toast.error("La D??pense est ??chou??e ! R??ssayez-vous une autre fois.")
                            }
                            else if(resolve.data.err === "NomCategorie is Null"){
                                toast.warn("Merci de S??l??ctionner Une Cat??gorie !")
                            }
                        })
                        .catch((err) => {
    
                        })
                    }
                    else{
                        const datasend = {id : id, typeDepense : typeDep, montant : montant, fact : fact, detail : detail}
                        axios.post("/depenses/new", datasend)
                        .then((resolve) => {
                            if(resolve.data.message === "Inserted"){
                                setMsg("La d??pense est enregistr?? avec Success")
                                props.history.push('/d??penses')
                                toast.success("La D??pense est Enregistr??e avec Succ??s")
                            }
                            else if(resolve.data.messageErr === "bad"){
                                setMsg("Really Bad")
                                toast.warn("Aucune D??pense pour l'instant !")
                            }
                            else if(resolve.data.err === "NomCategorie is Null"){
                                toast.warn("Merci de S??l??ctionner Une Cat??gorie !")
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                }
                else{
                    toast.warn("Les Champs qui ont (*) Sont Obligatoires")
                }
            }
        }
        else{
            console.log("No ID !!")
        }
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> D??claration d'une D??pense</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <FormControl className={classes.formControl}>
                                <InputLabel InputLabelProps={{ shrink: true,}} id="demo-simple-select-label">Type De La D??pense</InputLabel>
                                <Select style={{width : "100%"}} value={typeDep} onChange={e => setTypeDep(e.target.value)} displayEmpty className={classes.selectEmpty}>
                                    <Button color="primary" style={{width : "100%"}} onClick={handleOpen}><strong> Ajouter Une Cat??gorie</strong></Button>
                                        {
                                            mc === "Cool" && 
                                            categorie.map((cate) => {
                                                return(
                                                    <MenuItem key={`${cate.NomCategorie}`} value={`${cate.NomCategorie}`}>{cate.NomCategorie}</MenuItem>
                                                )
                                            })
                                        }
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="date" label="Date D??pense" type="date" className={classes.textField} onChange={e => setSelectedDate(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField type="number" InputLabelProps={{ shrink: true,}} id="standard-basic" label="Montant du D??pense" className={classes.root} onChange={e => setMontant(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="N?? Facture ou Bon" className={classes.root} onChange={e => setFact(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-12">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" multiline={true} label="Description de la D??pense" className={classes.textField} onChange={e => setDetail(e.target.value)} />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/d??penses" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Partager" onClick={EnregistrerDepense} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Cr??ation d'une Cat??gorie !"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" multiline={true} label="Ajouter Une Categorie " className={classes.textField} onChange={e => setAddCat(e.target.value)} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">Cancel</Button>
                    <Button onClick={AddCategorie} color="primary" autoFocus>Oui, Je Confirme !</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddDepense
