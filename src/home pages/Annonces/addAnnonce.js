import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {Button, IconButton, TextField} from '@material-ui/core';
import { toast } from 'react-toastify';
import { PhotoCamera } from '@material-ui/icons';

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
    const classes = useStyles();
    const id = localStorage.getItem('id')
    if(id !== null){
        const idParsed = parseInt(id)
        //console.log(idParsed)
    }
    const [sujet, setSujet] = useState('')
    const [descripAnnonce, setDescrip] = useState('')
    const [msg, setMsg] = useState('')
    const [file, setFile] = useState('')
    const [filename, setFileName] = useState('Chooose File')
    const [uploaded, setUploaded] = useState({})


    const selectedFile = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }
    
    const annoncer = () => {
        //const datasend = {id : id, sujet : sujet, descripAnnonce : descripAnnonce}
        //console.log(datasend)
        /*axios.post("http://localhost:5001/annonces/new", datasend)
        .then((resolve) => {
            if(resolve.data.message === "Inserted"){
                setMsg("L'annonce est enregistré avec Success")
                props.history.push('/annonces')
                toast.success('Votre Annonce est enregistré avec Succès')
            }
            else if(resolve.data.messageErr === "bad"){
                setMsg("Really Bad")
                toast.warn("l'Annonce est échoué ! Réssayez-vous une autre fois..")
            }
        })
        .catch((err) => console.log(err))*/

        const formdata = new FormData()
        formdata.append('anonce', file)
        //const datasend = {file : file, filename : filename}
         axios.post("http://localhost:5001/upload/annonce", formdata)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
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
                            <input type="file" onChange={e => selectedFile(e)} className="custom-file-input" id="customFile" />
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
