import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    alert :{
        width : "100%",
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom : theme.spacing(5),
            textAlign : 'center',
        },
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      textAlign : 'center',
      width: 300,
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 320,
        },
    },
  }));


function EditAnnonce(props) {
    const classes = useStyles()
    const [msg, setMsg] = useState('')
    const [annonce, setAnnonce] = useState({})
    const [sujet, setSjt] = useState('')
    const [descrip, setDesc] = useState('')

    useEffect(() => {
        const refAnnonce = props.match.params.refAnnonce
        if(refAnnonce !== ""){
            axios.get(`http://localhost:5001/annonces/annonce/${refAnnonce}`)
            .then(res => 
            {
                if(res.data.msgErr === "Not Found"){
                    setAnnonce({})
                }
                else{
                    setAnnonce(res.data[0])
                }
            })
            .catch(() => console.log("Cannot Read Data"))
        }
    }, [])


    const update = () => {
        const refAnnonce = props.match.params.refAnnonce
        if(sujet !== "" && descrip !== ""){
            axios.put(`http://localhost:5001/annonces/edit/${refAnnonce}`, [sujet, descrip])
            .then((resolve) => {
                if(resolve.data.message === "Updated Successfully"){
                    setMsg("Updated Successfully")
                }
            })
            .catch(() => {
                 
            })
        }
        else{
            setMsg("Champs Obligatoires")
        }
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Modifier Une Annonce  </h4></div>
                <div className="card-body">
                    {
                        msg === "Updated Successfully" && <div className={classes.alert} style={{textAlign : "center"}}><Alert severity="success">l'Annonce est Enregistré avec Succès</Alert> </div>
                    }
                    {
                        msg === "Champs Obligatoires" && <div className={classes.alert} style={{textAlign : "center"}}><Alert severity="error" >Les Champs qui ont (*) sont Obligatoires</Alert></div>
                    }
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="l'Objet d'Annonce."  required className={classes.container} multiline={true} defaultValue={annonce.Sujet} onChange={e => setSjt(e.target.value)} /> 
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Description d'Annonce"  required className={classes.container} multiline={true}  defaultValue={annonce.DescripAnnonce} onChange={e => setDesc(e.target.value)} /> 
                        </div>
                    </div><br /><br/>
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
                            <input type="submit" value="Valider" onClick={update} className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAnnonce
