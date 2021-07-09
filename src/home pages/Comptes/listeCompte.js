import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { IconButton, Button, Dialog, DialogContentText, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import { DeleteOutlined, UpdateOutlined }from '@material-ui/icons';
import { toast } from 'react-toastify';


axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

function ListeCompte(props) {

    /*if(!localStorage.getItem("token")){
        props.history.push('/')
    }*/
    const [compte, setCompte] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [Num, setNum] = useState('')

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (NumCompte) => {
        setOpen(true);
        setNum(NumCompte)
        console.log(NumCompte)
    };

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/users/" + search)
            .then((response) => {
                console.log(response)
                if(response.data.length > 0){
                    setCompte(response.data)
                    setMsg("")
                }
                else {
                    setMsg("No Users")
                    setCompte(response.data.msggg)
                    toast.warn("Aucun Compte est trouvé pour cette Recherche !")
                }
                
            })
            .catch(() => {

            })
        }
        else{ 
            axios.get("http://localhost:5001/users/all")
                .then((response) => {
                    if(response.data.length > 0){
                        setCompte(response.data)
                    }
                })
                .catch(() => console.log("No users"))
        }
    }, [search])
    

    const deleteCompte = (NumCompte) => {
        const id = NumCompte
        axios.delete("http://localhost:5001/users/delete/" + id)
        .then((response) => {
            if(response.data === "Ce Compte est Liée à un Logement !"){
                toast.warn("Ce Compte est Liée à un Logement !!")
            }
            else if(response.data === "Compte Introuvable"){
                toast.error("Compte Introuvable")
            }
            else if(response.data === "Deleted"){
                toast.info("Le Compte est Supprimé avec Succès")
                setMsg("Le Compte est Supprimé avec Succès")
            }
        })
        .then((next) => {
            next()
        })
        .catch(() => console.log("err"))
        
        setOpen(false)
    }

    const history = useHistory()
    const updateCompte = (id) => {
        history.push('/compte/edit/' + id)
    }



    return (
        <div className="" style={{top : "120px"}}><br/>
            <h1 style={{marginLeft : "200px"}}>Lister Les Comptes</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher Les Comptes..." className="form-control" onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div>
                {
                    msg === "" &&
                    <table className="table table-hover">
                        <thead>
                            <tr className="thead-light">
                                <th>Nom et Prénom</th>
                                <th>Fonction</th>
                                <th>Email</th>
                                <th>Téléphone</th>
                                <th>Role</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                compte.map((c) => {
                                    return (
                                        <tr key={c.NumCompte}>
                                            <td> {c.NomCompte} {c.PrenomCompte} </td>
                                            <td> {c.fonc} </td>
                                            <td> {c.EmailCompte} </td>
                                            <td> {c.telephone} </td>
                                            <td> {c.Role} </td>
                                            <td><img src={`profile img/${c.photo}`} alt="" width="60px" /> </td>
                                            <td><IconButton onClick={updateCompte.bind(this, c.NumCompte)}><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton></td>
                                            <td><IconButton onClick={handleOpen.bind(this, c.NumCompte)} ><DeleteOutlined style={{color : "red", fontSize : "30px"}} /></IconButton></td>
                                        </tr>
                                    )}
                                )
                            }
                        </tbody>
                    </table>
                }
            </div><br/><br/><br/><br/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title" color="secondary">{"Confirmation de la Suppression d'un Utilisateur ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Est ce que Voulez-Vous de SUPPRIMER Cet Utilisateur ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={deleteCompte.bind(this, Num)} color="secondary" autoFocus>Oui, Je Supprime !</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ListeCompte
