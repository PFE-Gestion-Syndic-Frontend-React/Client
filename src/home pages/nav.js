import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <p className="navbar-brand" >GSC</p>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/dépenses">Dépenses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cotisations">Cotisations</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/annonces">Annonces</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/réclamations">Réclamations</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/comptes">Comptes</Link>
                            </li>
                            <li className="nav-item float-end">
                                <Link className="nav-link " to="/settings">Mon Compte</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav
