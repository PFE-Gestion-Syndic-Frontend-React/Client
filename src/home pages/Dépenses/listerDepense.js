import React from 'react'
import {Link} from 'react-router-dom'

function ListerDepense() {
    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Dépenses</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher Les Dépenses..." className="form-control"  />
                        </div>
                    </div><br/><br/>
                </div>
            </div>
            <div className="container col-md-8 col-md-offset-2">
                <div className="card" style={{height : "270px"}}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-10">Réf Dépense : 12</div>
                            <div className="col-md-2">
                                <div className="row">
                                    <Link to="/dépense/edit/12" className="col-md-6 float-start"><i className="bi bi-pencil-square btn btn-success"></i></Link>
                                    <div className="col-md-6 float-end"><i className="bi bi-trash btn btn-danger"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6">
                                <label>Categorie : éléctricité</label>
                            </div>
                            <div className="col-md-6">
                                <label>Montant : <strong style={{color : "blue"}}>878 Dhs</strong></label>
                            </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-md-12">
                                Facturation ou Bon : N°688H87JJH
                            </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-md-12">
                                Description : sjkdnk skld,l skdlks, dksjdojefoz
                            </div>
                        </div><br/>
                    </div>
                    <div className="card-footer text-muted">
                        <small style={{color : "black"}} className="float-start">Déclaré Par : Benfarhi Zakaria</small>
                        <small style={{color : "silver"}} className="float-end">La date de déclaration : 21/06/2021</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListerDepense
