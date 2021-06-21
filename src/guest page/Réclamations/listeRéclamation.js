import React from 'react'

function ListeRéclamation() {
    return (
        <div style={{top : "90px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Réclamations de la Résidence </h1><br/><br/><br/>
            <div className="container col-md-8 col-md-offset-2"><br/><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher ..." className="form-control"  />
                        </div>
                    </div><br/><br/>
                </div>
                <div style={{paddingTop : "3%"}}>
                    Réc 1 :
                </div>
            </div>
        </div>
    )
}

export default ListeRéclamation
