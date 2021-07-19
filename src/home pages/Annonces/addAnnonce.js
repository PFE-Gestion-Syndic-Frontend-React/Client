import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { TextField} from '@material-ui/core';
import { toast } from 'react-toastify';
import Util from '../../utils/util';



const useStyles = makeStyles((theme) => ({
    
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
            width: 700,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 320,
    },
    root1: {
        '& > *': {
          margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
  }));


function AddAnnonce(props) {
    const History = useHistory()
    const classes = useStyles();
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('id')

    const [sujet, setSujet] = useState('')
    const [descripAnnonce, setDescrip] = useState('')
    const [msg, setMsg] = useState('')
    const [file, setFile] = useState('')

    useEffect(() =>{
        Util()
    })
    const annoncer = () => {
        if(id !== "" && sujet !== "" && descripAnnonce !== ""){
            if(file !== "" && file !== null){
                const formdata = new FormData()
                formdata.append('anonce', file)
                axios.post("http://localhost:5001/upload/annonce/" + id + "/" + sujet + "/" + descripAnnonce, formdata)
                .then((res) => {
                    if(res.data === "Inserted" || res.data === "Inserted and Uploaded"){
                        setMsg("L'annonce est enregistré avec Success")
                        History.push('/annonces')
                        toast.success('Votre Annonce est Enregistrée avec Succès')
                    }
                    else if(res.data.messageErr === "Bad One"){
                        setMsg("Really Bad")
                        toast.warn("l'Annonce est échoué ! Réssayez-vous une autre fois..")
                    }
                    else if(res.data.affectedRows !== 0){
                        History.push('/annonces')
                        toast.success("Votre Annonce est Enregistrée avec Succès")
                    }
                })
                .catch((err) => console.log(err))
            }
            else{
                const datasend = { sujet : sujet, descripAnnonce : descripAnnonce}
                axios.post("http://localhost:5001/annonces/new/" + id, datasend)
                .then((resolve) => {
                    if(resolve.data === "Inserted"){
                        setMsg("L'annonce est enregistré avec Success")
                        History.push('/annonces')
                        toast.success('Votre Annonce est enregistré avec Succès')
                    }
                    else if(resolve.data === "bad"){
                        setMsg("Really Bad")
                        toast.warn("l'Annonce est échoué ! Réssayez-vous une autre fois..")
                    }
                    else if(resolve.data === "Failed"){
                        toast.warn("l'Annonce est échoué ! Réssayez-vous une autre fois..")
                    }
                    else{
                        console.log("ress : ", resolve)
                    }
                    //console.log(resolve)
                })
                .catch((err) => console.log(err))
                }
            }
        else{
            toast.warn("Les Champs qui ont (*) sont Obligatoires")
        }
    }

    
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Postuler Une Annonce</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="l'Objet d'Annonce." className={classes.root} required onChange={e => setSujet(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Description de l'Annonce." className={classes.root} multiline={true} required onChange={e => setDescrip(e.target.value)} />
                        </div>
                    </div><br />
                    <div className="row container">
                        <div>
                            <input type="file" onChange={e => setFile(e.target.files[0])} className="custom-file-input" id="customFile" />
                            <label htmlFor="cutomFile" className="custom-file-label"></label>
                        </div>
                    </div><br />
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/annonces" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Partager" onClick={annoncer} className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAnnonce
