import React from 'react'
import {Link} from 'react-router-dom'
// import {Navbar, Nav, NavItem, Container} from 'reactstrap'

function Heading() {
    return (
        <div>
            <Link style={{marginLeft : "1200px", width : "200px"}} className="btn btn-success" to="/add-compte"><i className="bi bi-person-plus"></i> Créer un Compte</Link>    
        </div>
    )
}

export default Heading
