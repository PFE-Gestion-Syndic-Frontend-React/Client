import React from 'react'
import {Link} from 'react-router-dom'

function ListerAnnonces() {
    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Annonces</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher Les Annonces..." className="form-control"  />
                        </div>
                    </div><br/><br/>

                </div>
            </div>
            <div className="container col-md-8 col-md-offset-2">
                <div className="card" style={{height : "270px"}}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-10">Sujet d'Annonce</div>
                            <div className="col-md-2">
                                <div className="row">
                                    <Link to="/annonce/edit/1" className="col-md-6 float-start"><i className="bi bi-pencil-square btn btn-success"></i></Link>
                                    <div className="col-md-6 float-end"><i className="bi bi-trash btn btn-danger"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img className="card-img" src={`profile img/feedback sequence.png`} alt="No Pic Available" height="143px" width="120px" />
                            </div>
                            <div className="col-md-8">
                                Description d'Annonce
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <small style={{color : "black"}} className="float-start">Partagé Par : Benfarhi Zakaria</small>
                        <small style={{color : "silver"}} className="float-end">La date de mise à jour : 21/06/2021</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListerAnnonces
