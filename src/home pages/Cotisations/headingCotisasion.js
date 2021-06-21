import React from 'react'
import {Link} from 'react-router-dom'

function HeadingCotisasion() {
    return (
        <div>
            <Link style={{marginLeft : "1200px", width : "300px"}} className="btn btn-success" to="/add-cotisation"><i class="bi bi-cash-coin"></i>  Enregistrer Une Cotisation</Link>    
        </div>
    )
}

export default HeadingCotisasion
