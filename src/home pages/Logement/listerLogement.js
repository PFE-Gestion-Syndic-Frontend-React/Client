import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function ListerLogement() {

    const [search, setSearch] = useState('')
    const [logement, setLogement] = useState()
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/logements/" + search)
            .then((response) => {
                if(response.data.length > 0){
                    setLogement(response.data)
                    setMsg("founded")
                }
                else {
                    setMsg("No Logements")
                    setLogement(response.data.msggg)
                }
                
            })
            .catch(() => {

            })
        }
        else{ 
            axios.get("http://localhost:5001/logements/all")
            .then((response) => {
                if(response.data.length > 0){
                    setLogement(response.data)
                    setMsg("founded")
                }
            })
            .catch(() => console.log("No Logements"))
        }
    })

    return (
        <div>
            <div style={{top : "120px"}}>
                <h1 style={{marginLeft : "200px"}}>Lister Les Logements</h1>
                <div className="container col-md-8 col-md-offset-2"><br/>
                    <div className="container col-md-10 col-md-offset-1">
                        <div className="row">
                            <div>
                                <input type="text" placeholder="Chercher Les Logements..." className="form-control" onChange={e => setSearch(e.target.value)}  />
                            </div>
                        </div><br/><br/>
                    </div>
                </div>
                <div className="container col-md-8 col-md-offset-4">
                    {
                        msg === "founded" && 
                        <table className="table table-hover">
                            <thead>
                                <tr className="thead-light">
                                    <th>Nom et Prénom du Copropriétaire</th>
                                    <th>E-mail</th>
                                    <th>Téléphone</th>
                                    <th>Logement</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    logement.map((l) => {
                                        return (
                                            <tr key={l.NumCompte}>
                                                <td> {l.NomCompte} {l.PrenomCompte} </td>
                                                <td> {l.EmailCompte} </td>
                                                <td> {l.telephone} </td>
                                                <td> {l.RefLogement} </td>
                                                <td><Link to={`/logement/info/1`}><i className="bi bi-info-circle btn btn-outline-primary"></i></Link></td>
                                                <td><Link to={`/logement/edit/1`}><i className="bi bi-pencil-square btn btn-success"></i></Link></td>
                                                <td><i className="bi bi-trash btn btn-danger"></i></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }
                    {
                        msg === "No Logements" &&
                        <div className="alert alert-danger center">
                            Aucune Résultat pour cette Recherche {search}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ListerLogement
