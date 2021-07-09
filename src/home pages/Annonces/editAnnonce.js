import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import {TextField, FormControlLabel} from '@material-ui/core';
import { toast } from 'react-toastify';

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
    const [statut, setStatut] = useState(false)
    const refAnnonce = props.match.params.refAnnonce

    console.log("Check : ",statut.checkedSt)
    useEffect(() => {
        if(refAnnonce !== ""){
            axios.get(`http://localhost:5001/annonces/annonce/${refAnnonce}`)
            .then(res => 
            {
                if(res.data.msgErr === "Not Found"){
                    setAnnonce({})
                    toast.info("Aucune Annonce pour l'instant !")
                }
                else{
                    setAnnonce(res.data[0])
                }
            })
            .catch(() => console.log("Cannot Read Data"))
        }
    }, [refAnnonce])

    const handleStatut = (e) => {
        setStatut({[e.target.name] : e.target.checked})
    }

    const update = () => {
        const refAnnonce = props.match.params.refAnnonce
        if(sujet !== "" && descrip !== ""){
            const datasend = {sujet : sujet, descrip : descrip}
            axios.put(`http://localhost:5001/annonces/edit/${refAnnonce}`, datasend)
            .then((resolve) => {
                if(resolve.data.message === "Updated Successfully"){
                    setMsg("Updated Successfully")
                    props.history.push('/annonces')
                    toast.success("l'Annonce a été modifiée avec Succès")
                }
            })
            .catch(() => {
                 
            })
        }
        else{
            setMsg("Champs Obligatoires")
            toast.warn("Les Champs qui ont (*) sont Obligatoires")
        }
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Modifier Une Annonce  </h4></div>
                <div className="card-body">
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
                    <div className="row">
                        <div className="col-md-4">Statut d'Annonce : </div>
                        <div className="col-md-4"><input type="radio" name="st" value="Visible"  onChange={e => setStatut(e.target.value)} /> Visible</div>
                        <div className="col-md-4"><input type="radio" name="st" value="Invisible"  onChange={e => setStatut(e.target.value)} /> Invisible</div>
                    </div><br />
                    {
                        statut === "Visible" && 
                        <div className="text-muted"><small>Visible : les Copropriétaires peuvent consulter cette Annonce.</small> </div>
                    }
                    {
                        statut === "Invisible" &&
                        <div className="text-muted"><small>Invisible : Signifie que cette annonnce ne sera pas Visible par le Copropriétaire.</small><br/><br/></div>
                    }
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
