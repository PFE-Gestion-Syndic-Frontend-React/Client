import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  }));


function AddAnnonce(props) {
    const classes = useStyles();
    const id = localStorage.getItem('id')
    if(id !== null){
        const idParsed = parseInt(id)
        console.log(idParsed)
    }
    const [sujet, setSujet] = useState('')
    const [descripAnnonce, setDescrip] = useState('')
    const [msg, setMsg] = useState('')

    const annoncer = () => {
        const datasend = {id : id, sujet : sujet, descripAnnonce : descripAnnonce}
        console.log(datasend)
        axios.post("http://localhost:5001/annonces/new", datasend)
        .then((resolve) => {
            if(resolve.data.message === "Inserted"){
                setMsg("L'annonce est enregistré avec Success")
                //props.history.push('/annonces')
            }
            else if(resolve.data.messageErr === "bad"){
                setMsg("Really Bad")
            }
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Postuler Une Annonce</h4></div>
                <div className="card-body">
                    {
                        msg === "L'annonce est enregistré avec Success" && <div className="alert alert-success center"> {msg} </div>
                    }
                    {
                        msg === "Really Bad" && <div className="alert alert-danger center"> {msg} </div>
                    }
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
                        <input type="file" className="form-control" multiple="multiple" />
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
