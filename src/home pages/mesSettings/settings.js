import React from 'react'

function Settings() {
    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Mettre à Jour Mon Compte</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Nom" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Prénom" />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="email" className="form-control" placeholder="Votre E-mail"  />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Téléphone" />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-2">
                            <label style={{fontSize : "15px", marginLeft : "5px"}}>Role : </label>
                        </div>
                        <div className="col-md-4">
                           <select className="form-control" >
                               <option value="Copropriétaire" >Copropriétaire</option>
                               <option value="Administrateur">Administrateur</option>
                           </select>
                        </div>
                        <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Votre Fonction au sein du Syndicat..."  />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="password" placeholder="Ancien Password" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <input type="password" placeholder="Nouveau Password" className="form-control" />
                        </div>
                    </div><br />
                    <div className="row">
                        <div className="col-md-6">
                            <label style={{fontSize : "15px"}}>Sélectionner Votre Avatare : </label>
                        </div>
                        <div className="col-md-6">
                            <input type="file" accept=".png" className="form-control" />
                        </div>
                    </div><br /><br/>
                    <div className="row">
                        <div className="">
                            <input type="submit" value="Enregistrer" className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default Settings
