import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import GuestVerify from '../../utils/guestVerify';

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


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



function EditReclamation(props) {
    const classes = useStyles()
    const [msg, setMsg] = useState('')
    const [reclamation, setReclamation] = useState({})
    const [objt, setObjt] = useState('')
    const [mesage, setMesage] = useState('')
    const [por, setPor] = useState('Privée')
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState('')
    const refReclamation = props.match.params.num

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }



    useEffect(() => {
        GuestVerify()
        if(refReclamation !== "" || refReclamation !== undefined){
            axios.get(`http://localhost:5001/reclamations/reclamation/${refReclamation}`)
            .then(res => 
            {
                if(res.data.msgErr === "Not Found"){
                    setReclamation({})
                }
                else{
                    setReclamation(res.data[0])
                }
            })
            .catch(() => console.log("Cannot Read Data"))
        }
    }, [refReclamation])


    const update = () => {
        if(objt !== "" && mesage !== "" && por !== ""){
            if(file !== "" && file !== undefined){

            }
            else{
                const datasend = {objet : objt,message : mesage, pour : por}
                axios.put(`http://localhost:5001/reclamations/maReclamation/edit/${refReclamation}`, datasend)
                .then((resolve) => {
                    console.log(resolve.data)
                    if(resolve.data.affectedRows !== 0){
                        setMsg("Updated Successfully")
                        props.history.push('/Réclamations')
                        toast.success("Votre Réclamation a été modifiée avec Succès")
                    }
                })
                .catch(() => {
                     
                })
            }
        }
        else if(objt === "" && mesage === "" && por === ""){
            props.history.push('/Réclamations')
            toast.success("Votre Réclamation a été modifiée avec Succès")
        }
        else{
            setMsg("Champs Obligatoires")
            toast.warn("Les Champs qui ont (*) sont Obligatoires")
        }
        setOpen(false)
    }





    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Modifier Une Réclamation  </h4></div>
                <div className="card-body">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="l'Objet du Réclamation"  required className={classes.container} multiline={true} defaultValue={reclamation.Objet} onChange={ e => setObjt(e.target.value) } />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Message du Réclamation"  required className={classes.container} multiline={true}  defaultValue={reclamation.Message} onChange={ e => setMesage(e.target.value) } />
                        </div>
                    </div><br />
                        <div><label>Réclamation est {reclamation.pour} </label></div>
                    <br/>
                    {
                        por === 'Privée' ?
                        <div>
                        <div className="row container">
                            <div className="col-md-4">Réclamation est : </div>
                            <div className="col-md-4"><input type="radio" name="st" checked value="Privée" onChange={e => setPor(e.target.value)} /> Privée</div>
                            <div className="col-md-4"><input type="radio" name="st" value="Public" onChange={e => setPor(e.target.value)} /> Public</div>
                        </div><br/><div className="text-muted" style={{marginLeft : "17px"}}><small>Privée signifie que Votre Réclamation sera accessible par les Administrateurs.</small></div></div>:
                        <div>
                        <div className="row container">
                            <div className="col-md-4">Réclamation est : </div>
                            <div className="col-md-4"><input type="radio" name="st" value="Privée" onChange={e => setPor(e.target.value)} /> Privée</div>
                            <div className="col-md-4"><input type="radio" name="st" checked value="Public" onChange={e => setPor(e.target.value)} /> Public</div>
                        </div><br/>
                        <div className="text-muted" style={{marginLeft : "17px"}}><small>Public signifie que Votre Réclamation sera accessible par les Copropriétaires et les Administrateurs.</small></div></div>
                    }
                    <br/>
                    <div className="row container">
                        <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} />
                    </div><br />
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/Réclamations" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Valider" onClick={handleOpen} className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la mise à jour du Réclamation ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Est ce que vous etes sure de modifier cette Réclamation ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={update} color="secondary" autoFocus>Oui, Je Confirme !</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditReclamation
