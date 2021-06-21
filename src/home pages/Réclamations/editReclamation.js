import React from 'react'
import {Link} from 'react-router-dom'

function EditReclamation() {
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i class="bi bi-clipboard-check"></i> Modifier Une Réclamation</h4></div>
                <div className="card-body">
                    <div className="row">
                        <label>Objet : Réclamation du test 1</label>
                    </div><br/>
                    <div className="row">
                        <label>Description : .........</label>
                    </div><br />
                    <div className="row container">
                        <select className=" form-control">
                            <option>Résolue</option>
                            <option>Non Résolue</option>
                            <option>En Cours</option>
                        </select>
                    </div>
                </div><br/>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/réclamations" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Valider" className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditReclamation
