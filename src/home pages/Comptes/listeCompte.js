import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function ListeCompte(props) {

    const [compte, setCompte] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/users/" + search)
            .then((response) => {
                if(response.data.length > 0){
                    setCompte(response.data)
                    setMsg("")
                }
                else {
                    setMsg("No Users")
                    setCompte(response.data.msggg)
                }
                
            })
            .catch(() => {

            })
        }
        else{ 
            axios.get("http://localhost:5001/users/all")
                .then((response) => {
                    if(response){
                        setCompte(response.data)
                    }
                })
                .catch(() => console.log("No users"))
        }
    }, [search])
    

    function deleteCompte(id){
        return (
            console.log(id)
            /*axios.delete("http://localhost:5001/users/delete/" + id)
            .then((response) => {
                //setMsg(response.data)
                console.log("yes")
            })
            .then(() => {
                console.log("ok")
            })
            .catch(() => console.log("err"))*/
        )
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
                                            <td><img src={`profile img/${c.photo}`} alt="" width="120px" /> </td>
                                            <td><Link to={`/compte/edit/${c.NumCompte}`}><i className="bi bi-pencil-square btn btn-success"></i></Link></td>
                                            <td><i className="bi bi-trash btn btn-danger" onClick={deleteCompte.bind(this, c.NumCompte)}></i></td>
                                        </tr>
                                    )}
                                )
                            }
                        </tbody>
                    </table>
                }
                {
                    msg === "No Users"  && <div className="alert alert-danger center">Aucun Résultat !!</div>
                }
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default ListeCompte
