import React from 'react'
import {Link} from 'react-router-dom'

function HeadingAnnonce() {
    return (
        <div>
            <Link style={{marginLeft : "1200px", width : "200px", marginTop : "5%"}} className="btn btn-success" to="/add-annonce"><i className="bi bi-megaphone-fill"></i> Créer une Annonce</Link>    
        </div>
    )
}

export default HeadingAnnonce
