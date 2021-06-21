import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

function EditCompte(props) {

    const [user, setUser] = useState({})
    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [tele, setTele] = useState('')
    const [role, setRole] = useState('')
    const [fonc, setFonc] = useState('')
    const [photo, setPhoto] = useState('')
    const [msg, setMsg] = useState('')


    

    useEffect(() => {
        const id = props.match.params.id
        if(id !== ""){
            axios.get(`http://localhost:5001/users/user/${id}`)
            .then(res => 
            {
                if(res.data.msgErr === "Not Found"){
                    setMsg("Not Allowed")
                    setUser({})
                }
                else{
                    setUser(res.data[0])
                }
            })
            .catch(() => console.log("Cannot Read Data"))
        }
    })


    const UpdateAccount = () => {
        if(nom !== "" && prenom !== "" && tele !== "" && role !== "" && fonc !== ""){
            const dataUpdated = {nom : nom, prenom : prenom, fon : fonc, tele : tele, role : role, photo : photo}
            const id = props.match.params.id
            axios.put(`http://localhost:5001/users/edit/${id}`, dataUpdated)
            .then((response) => {
                console.log(response)
                if(response.data.message === "Updated Successfully"){
                    setMsg(response.data.message)
                    console.log(msg)
                    //props.history.push('/comptes')
                }
            })
            .catch(() => console.log("Bad"))
        }
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Mettre à Jour Le Compte</h4></div>
                <div className="card-body">
                    <div>
                        {
                            msg === "Updated Successfully" && <div className="alert alert-success text-center">{msg}</div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Nom" defaultValue={user.NomCompte} onChange={e => setNom(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Prénom" defaultValue={user.PrenomCompte} onChange={e => setPrenom(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="email" className="form-control" placeholder="Votre E-mail" defaultValue={user.EmailCompte} disabled="disabled" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Téléphone" defaultValue={user.telephone} onChange={e => setTele(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-2">
                            <label style={{fontSize : "20px"}}>Role : </label>
                        </div>
                        <div className="col-md-4">
                           <select className="form-control" defaultValue={user.Role} onChange={e => setRole(e.target.value)}>
                               <option value="Copropriétaire" >Copropriétaire</option>
                               <option value="Administrateur">Administrateur</option>
                           </select>
                        </div>
                        <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Votre Fonction au sein du Syndicat..." defaultValue={user.fonc} onChange={e => setFonc(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <label style={{fontSize : "20px"}}>Sélectionner Votre Avatare : </label>
                        </div>
                        <div className="col-md-6">
                            <input type="file" className="form-control" onChange={e => setPhoto(e.target.value)} />
                        </div>
                    </div><br />
                    <div>
                        <img src={`profile img/${photo}`} alt={`${photo}`} width="100px" />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/comptes" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Mettre à Jour" onClick={UpdateAccount} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default EditCompte
