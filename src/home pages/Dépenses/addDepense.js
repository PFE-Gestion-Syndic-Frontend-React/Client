import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, MenuItem, Select, FormControl, TextField } from '@material-ui/core';
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
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState('');
    const [typeDep, setTypeDep] = useState('')
    const [montant, setMontant] = useState('')
    const [fact, setFact] = useState('')
    const [detail, setDetail] = useState('')
    const [categorie, setCategorie] = useState()
    const [mc, setMC] = useState('')
    const [msg, setMsg] = useState('')
    const id = localStorage.getItem('id')
    console.log(msg)
    useEffect(() => {
        axios.get("http://localhost:5001/depenses/categorie/all")
        .then((resolve) => {
            setCategorie(resolve.data)
            setMC('Cool')
        })
        .catch((err) => {
            setCategorie(err)
            setMC('')
        })
    }, [])

    const EnregistrerDepense = () => {
        if(id !== null && id !== undefined){
            if(typeDep !== "" && montant !== "" && fact !== "" && detail !== ""){
                if(selectedDate !== ''){
                    const datasend = {id : id, typeDepense : typeDep, date : selectedDate, montant : montant, fact : fact, detail : detail}
                    axios.post("http://localhost:5001/depenses/new", datasend)
                    .then((resolve) => {
                        if(resolve.data.message === "Inserted"){
                            setMsg("La dépense est enregistré avec Success")
                            props.history.push('/dépenses')
                            toast.success("La Dépense est Enregistrée avec Succès")
                        }
                        else if(resolve.data.messageErr === "bad"){
                            setMsg("Really Bad")
                            toast.error("La Dépense est échouée ! Réssayez-vous une autre fois.")
                        }
                    })
                    .catch((err) => {

                    })
                    console.log(datasend)
                }
                else{
                    const datasend = {id : id, typeDepense : typeDep, montant : montant, fact : fact, detail : detail}
                    axios.post("http://localhost:5001/depenses/new", datasend)
                    .then((resolve) => {
                        if(resolve.data.message === "Inserted"){
                            setMsg("La dépense est enregistré avec Success")
                            props.history.push('/dépenses')
                            toast.success("La Dépense est Enregistrée avec Succès")
                        }
                        else if(resolve.data.messageErr === "bad"){
                            setMsg("Really Bad")
                            toast.warn("Aucune Dépense pour l'instant !")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    console.log(datasend)
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
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Déclaration d'une Dépense</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <FormControl className={classes.formControl}>
                                <Select style={{width : "100%"}} value={typeDep} onChange={e => setTypeDep(e.target.value)} displayEmpty className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }} >
                                    <MenuItem value="" disabled> Type du Dépense </MenuItem>
                                    <Button color="primary" style={{width : "100%"}}><strong> Ajouter Une Catégorie</strong></Button>
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
                            <TextField InputLabelProps={{ shrink: true,}} id="date" label="Date Dépense" type="date" className={classes.textField} onChange={e => setSelectedDate(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Montant du Dépense" className={classes.root} onChange={e => setMontant(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="N° Facture ou Bon" className={classes.root} onChange={e => setFact(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-12">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" multiline={true} label="Description de la Dépense" className={classes.textField} onChange={e => setDetail(e.target.value)} />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/dépenses" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Partager" onClick={EnregistrerDepense} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default AddDepense
