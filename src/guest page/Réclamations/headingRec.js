import React from 'react'
import {Link} from 'react-router-dom'

function HeadingRec() {
    return (
        <div >
            <Link style={{marginLeft : "900px", width : "200px"}} className="btn btn-info" to="/mes-réclamations"><i className=""></i>  Mes Réclamations</Link>
            <Link style={{marginLeft : "100px", width : "300px"}} className="btn btn-success" to="/add-réclamation"><i className="bi bi-person-plus"></i> Créer une Réclamation</Link>
        </div>
    )
}

export default HeadingRec
