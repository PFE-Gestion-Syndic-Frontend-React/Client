import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField, Input, IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
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
    input : {
        display : "none",
    }
  }));


function EditAnnonce(props) {
    const History = useHistory()
    const classes = useStyles()
    const [msg, setMsg] = useState('')
    const [annonce, setAnnonce] = useState({})
    const [sujet, setSjt] = useState('')
    const [descrip, setDesc] = useState('')
    const [statut, setStatut] = useState('1')
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState('')
    const refAnnonce = props.match.params.refAnnonce

    if(msg){}

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

        if(refAnnonce !== ""){
            const run = axios.get(`/annonces/annonce/${refAnnonce}`)
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
            .catch(() => {})

            return (() => clearInterval(run))
        }
    }, [refAnnonce, History])


    const update = () => {
        const refAnnonce = props.match.params.refAnnonce
        if(sujet !== "" && descrip !== "" && statut !== ""){
            const datasend = {sujet : sujet, descrip : descrip, statut : statut}
            axios.put(`/annonces/edit/${refAnnonce}`, datasend)
            .then((resolve) => {
                if(resolve.data.message === "Updated Successfully"){
                    setMsg("Updated Successfully")
                    props.history.push('/annonces')
                    toast.success("l'Annonce a ??t?? modifi??e avec Succ??s")
                }
            })
            .catch(() => {
                 
            })
        }
        else if(sujet === "" && descrip === "" && statut === ""){
            props.history.push('/annonces')
            toast.success("l'Annonce a ??t?? modifi??e avec Succ??s")
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
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Modifier Une Annonce  </h4></div>
                <div className="card-body">
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="l'Objet d'Annonce."  required className={classes.container} multiline={true} defaultValue={annonce.Sujet} onChange={e => setSjt(e.target.value)} />
                        </div>
                    </div><br/><br/>
                    <div className="row">
                        <div>
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Description d'Annonce"  required className={classes.container} multiline={true}  defaultValue={annonce.DescripAnnonce} onChange={e => setDesc(e.target.value) } />
                        </div>
                    </div><br /><br/>
                    <div className="row">
                        <div className="col-md-4">Statut d'Annonce : </div>
                        <div className="col-md-4"><input type="radio" name="st" value={1}  onChange={e => setStatut(e.target.value)} /> Visible</div>
                        <div className="col-md-4"><input type="radio" name="st" value={0}  onChange={e => setStatut(e.target.value)} /> Invisible</div>
                    </div><br />
                    {
                        statut === 1 && 
                        <div className="text-muted"><small>Visible : les Copropri??taires peuvent consulter cette Annonce.</small><br/><br/></div>
                    }
                    {
                        statut === 0 &&
                        <div className="text-muted"><small>Invisible : Signifie que cette annonnce ne sera pas Visible par le Copropri??taire.</small><br/><br/></div>
                    }
                    <div className="row container" style={{alignItems : "center"}}>
                        <div className="col-md-6" style={{textAlign : "right"}}>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" type="file" className={classes.input} onChange={e => setFile(e.target.files[0])} />
                                <Button variant="contained" component="span">Upload</Button>
                            </label>
                        </div>
                        <div className="col-md-6" style={{textAlign : "left"}}>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" className={classes.input} onChange={e => setFile(e.target.files[0])} />
                                <IconButton color="primary" aria-label="upload picture" component="span"><PhotoCamera /></IconButton>
                            </label>
                        </div>
                    </div>
                    {
                        file !== '' &&
                        <div className="row container" style={{textAlign : "center"}}>
                            <label>{file.name} </label>
                        </div>
                    }<br/>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/annonces" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Valider" onClick={handleOpen} className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la mise ?? jour d'Annonce ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Est ce que vous etes sure de modifier cette Annonce ?
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

export default EditAnnonce
