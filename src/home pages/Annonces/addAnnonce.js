import React from 'react'
import {Link} from 'react-router-dom'

function AddAnnonce() {
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-megaphone-fill"></i> Postuler Une Annonce</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div>
                            <input type="text" className="form-control" placeholder="l'Objet d'Annonce." required="required"  />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div>
                            <textarea className="form-control" rows="5" placeholder="Description d'Annonce..." required="required"></textarea>
                        </div>
                    </div><br />
                    <div className="row container">
                        <input type="file" className="form-control" multiple="multiple" />
                    </div><br />
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/annonces" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Partager" className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAnnonce
