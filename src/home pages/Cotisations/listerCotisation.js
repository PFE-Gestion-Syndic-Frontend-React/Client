import React from 'react'
import {Link} from 'react-router-dom'

function ListerCotisation() {
    return (
        <div style={{paddingTop : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Cotisations</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher Les Cotisations..." className="form-control"  />
                        </div>
                    </div><br/><br/>
                </div>
            </div>

            <div className="container col-md-8 col-md-offset-2">
                <div className="card" style={{height : "270px"}}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-10">Réf Logement : imm 5 app 23</div>
                            <div className="col-md-2">
                                <div className="row">
                                    <Link to="/cotisation/edit/1" className="col-md-6 float-start"><i className="bi bi-pencil-square btn btn-success"></i></Link>
                                    <div className="col-md-6 float-end"><i className="bi bi-trash btn btn-danger"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        
                        
                    </div>
                    <div className="card-footer text-muted">
                        <small style={{color : "silver"}} className="float-end">La date de Paiement : 20/06/2021</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListerCotisation
