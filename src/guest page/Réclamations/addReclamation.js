import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { toast } from 'react-toastify';
import GuestVerify from '../../utils/guestVerify';



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



function AddReclamation(props) {
    const classes = useStyles();
    const id = localStorage.getItem('id')
    const [objet, setObjet] = useState('')
    const [message, setMessage] = useState('')
    const [pour, setPour] = useState('Privée')
    const [msg, setMsg] = useState('')
    const [log, setLog] = useState('')
    const [file, setFile] = useState('')

    useEffect(() => {
        GuestVerify()
        if(id !== '' && id !== undefined && id !== null){
            axios.get(`http://localhost:5001/logements/copro/NumCompte/${id}`)
            .then((resolve) => {
                if(resolve.data === "Id Invalid"){
                    localStorage.clear()
                    props.history.push('/acceuil')
                }
                else{
                    setLog(resolve.data)
                }
            })
            .catch(() => {})
            
        }
        else if(id === '' || id === undefined || id === isNaN){
            localStorage.clear()
            props.history.push('/acceuil')
        }
    }, [id, props.history])


    const reclamer = () => {
        if(log !== undefined && log !== "" && objet !== '' && message !== ''){
            if(file !== "" && file !== null){
                const formdata = new FormData()
                formdata.append('reclam', file)
                axios.post("http://localhost:5001/upload/reclamation/" + log + "/" + objet + "/" + message + "/" + pour , formdata)
                .then((res) => {
                    if(res.data === "Inserted" || res.data === "Inserted and Uploaded"){
                        setMsg("Votre Réclamation est enregistré avec Success")
                        props.history.push('/Réclamations')
                        toast.success('Votre Réclamation est Enregistrée avec Succès')
                    }
                    else if(res.data.messageErr === "Bad One"){
                        setMsg("Really Bad")
                        toast.warn("Votre Réclamation est échoué ! Réssayez-vous une autre fois..")
                    }
                    else if(res.data.affectedRows !== 0){
                        props.history.push('/Réclamations')
                    }
                    toast.success("Votre Réclamation est Enregistrée avec Succès")
                })
                .catch((err) => console.log(err))
            }
            else{
                
                const datasend = {log : log, objet : objet, message : message, pour : pour}
                axios.post("http://localhost:5001/reclamations/new", datasend)
                .then((resolve) => {
                    if(resolve.data === "Inserted"){
                        setMsg("Votre Réclamation est enregistré avec Success")
                        props.history.push('/Réclamations')
                        toast.success('Votre Réclamation est Enregistré avec Succès')
                    }
                    else if(resolve.data === "bad"){
                        setMsg("Really Bad")
                        toast.warn("Votre Réclamation est échoué ! Réssayez-vous une autre fois..")
                    }
                })
                .catch((err) => console.log(err))
            }
        }
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Réclamer</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="l'Objet de Réclamation : " className={classes.root} required onChange={e => setObjet(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Votre Message : " className={classes.root} multiline={true} required onChange={e => setMessage(e.target.value)} />
                        </div>
                    </div><br />
                    {
                        pour === 'Privée' ?
                        <div>
                        <div className="row container">
                            <div className="col-md-4">Réclamation est : </div>
                            <div className="col-md-4"><input type="radio" name="st" checked value="Privée" onChange={e => setPour(e.target.value)} /> Privée</div>
                            <div className="col-md-4"><input type="radio" name="st" value="Public" onChange={e => setPour(e.target.value)} /> Public</div>
                        </div><br/><div className="text-muted" style={{marginLeft : "17px"}}><small>Privée signifie que Votre Réclamation sera accessible par les Administrateurs.</small></div> </div>:
                        <div>
                        <div className="row container">
                            <div className="col-md-4">Réclamation est : </div>
                            <div className="col-md-4"><input type="radio" name="st" value="Privée" onChange={e => setPour(e.target.value)} /> Privée</div>
                            <div className="col-md-4"><input type="radio" name="st" checked value="Public" onChange={e => setPour(e.target.value)} /> Public</div>
                        </div><br/>
                        <div className="text-muted" style={{marginLeft : "17px"}}><small>Public signifie que Votre Réclamation sera accessible par les Copropriétaires et les Administrateurs.</small></div></div>
                    }
                    <br/>
                    <div className="row container">
                        <input type="file" onChange={e => setFile(e.target.files[0])} className="custom-file-input" id="customFile" />
                        <label htmlFor="cutomFile" className="custom-file-label"></label>
                    </div><br />
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/Réclamations" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Partager" onClick={reclamer} className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReclamation
