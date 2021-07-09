import React from 'react'

function ListeReclamation() {
    return (
        <div style={{top : "90px", paddingTop : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Réclamations de la Résidence </h1><br/><br/>
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

export default ListeReclamation
