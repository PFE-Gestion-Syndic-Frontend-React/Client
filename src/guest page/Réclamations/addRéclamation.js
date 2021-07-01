import React, { useState } from 'react'

function AddRéclamation() {

    const [obj, setObj] = useState('')
    const [message, setMessage] = useState('')
    const [ pour, setPour ] = useState('')

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Création d'une Réclamation</h4></div>
                <div className="card-body">
                    <div className="row">
                        <input type="text" className="form-control" maxLength="100" placeholder="L'Objet" onChange={e => setObj(e.target.value)} />
                    </div><br/>
                    <div className="row">
                        <textarea rows="5" className="form-control" placeholder="Votre Message" onChange={e=> setMessage(e.target.value)}></textarea>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-4">Réclamation est : </div>
                        <div className="col-md-4"><input type="radio" name="pour" value="Privée"  onChange={e => setPour(e.target.value)} />  Privée</div>
                        <div className="col-md-4"><input type="radio" name="pour" value="Public"  onChange={e => setPour(e.target.value)} />  Public</div>
                    </div><br/>
                    {
                        pour === "Privée" && <div className="text-muted"> 
                            <h6>
                                Privée* : Signifie que votre réclamation sera envoyée directement aux Administrateurs.
                            </h6> 
                        </div>
                    }
                    {
                        pour === "Public" && <div className="text-muted"> 
                            <h6>
                                Public* : Signifie que votre réclamation sera accessible par les Administrateurs et les Copropriétaires.
                            </h6> 
                        </div>
                    }
                    <div className="row">
                        <input type="file" multiple className="form-control" />
                    </div><br/><br/>
                    <div className="row">
                        <input type="submit" className="btn btn-success form-control" value="Réclamer" />
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default AddRéclamation
