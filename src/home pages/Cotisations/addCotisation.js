import React, { useState } from 'react'
import {Link} from 'react-router-dom'

function AddCotisation() {

    let cotMontanat = 200
    const [mois, setMois] = useState(1)
    const [methode, setMethode] = useState("Espèce")
    const [log, setLog] = useState("")

    const Valider = () => {
        if(log !== ""){
            var Year = new Date().getFullYear()
            var month = new Date().getMonth() + 1
            var day = ""
            var paied = day + month + Year
            var pay = paied + "-" + log
            console.log(pay)
        }
    }
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Enregistrement d'une Cotisation </h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" placeholder="Logement Concerné" className="form-control" onChange={e => setLog(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label style={{paddingTop : "5px"}}>Nom et Prénom : <strong>Ben Said</strong></label>
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="number" defaultValue="1" placeholder="Nombre de Mois" className="form-control" onChange={e => setMois(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            {
                                mois !== "" && <label style={{paddingTop : "2px"}}> Montant TTC : <strong style={{color : "blue", fontSize : "20px"}}>  {mois * cotMontanat} Dhs</strong></label>
                            }
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-12">
                            <select className="form-control" onChange={e => setMethode(e.target.value)}>
                                <option>Espèce</option>
                                <option>Chèque</option>
                            </select>
                        </div>
                    </div><br/>
                    {
                        methode === "Chèque" && 
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="Num Chèque" />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="La Banque" />
                            </div><br />
                        </div>
                    }
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/cotisations" className="form-control btn btn-outline-danger" >Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Valider" className="form-control btn btn-primary" onClick={Valider} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCotisation
