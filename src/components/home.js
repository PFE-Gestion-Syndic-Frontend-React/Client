import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import AddAnnonce from '../home pages/Annonces/addAnnonce'
import Annonce from '../home pages/Annonces/annonce'
import AddCompte from '../home pages/Comptes/addCompte'
import Compte from '../home pages/Comptes/compte'
import EditCompte from '../home pages/Comptes/editCompte'
import ListeCompte from '../home pages/Comptes/listeCompte'
import Cotisation from '../home pages/Cotisations/cotisation'
import Depense from '../home pages/Dépenses/depense'
import Settings from '../home pages/mesSettings/settings'
import Reclamation from '../home pages/Réclamations/reclamation'
import Nav from './../home pages/nav'
import EditAnnonce from '../home pages/Annonces/editAnnonce'
import ListerAnnonces from '../home pages/Annonces/listerAnnonces'
import EditReclamation from '../home pages/Réclamations/editReclamation'
import AddCotisation from '../home pages/Cotisations/addCotisation'
import EditCotisation from '../home pages/Cotisations/editCotisation'
import ListerCotisation from '../home pages/Cotisations/listerCotisation'

function Home() {
    return (
        <div>
            <Router>
                <div className="fixed-top">
                    <Nav />
                </div>
                <div style={{paddingTop : '5%'}}>
                    <Switch>
                        <Route exact path="/dépenses" component={Depense} />
                        <Route exact path="/cotisations" component={Cotisation} />
                        <Route exact path="/annonces" component={Annonce} />
                        <Route exact path="/réclamations" component={Reclamation} />
                        <Route exact path="/comptes" component={Compte} />
                        <Route exact path="/settings" component={Settings} />

                        <Route exact path="/add-cotisation" component={AddCotisation} /> 
                        <Route exact path="/cotisation/edit/:numCotisation" component={EditCotisation} />
                        <Route exact path="/all/cotisations" component={ListerCotisation} />                 

                        <Route exact path="/add-annonce" component={AddAnnonce} />
                        <Route exact path="/annonce/edit/:refAnnonce" component={EditAnnonce} />
                        <Route exact path="/all/annonces" component={ListerAnnonces} />

                        <Route exact path="/réclamation/edit/:refReclamation" component={EditReclamation} />

                        <Route exact path="/add-compte" component={AddCompte} />
                        <Route exact path="/compte/edit/:id" component={EditCompte} />
                        <Route exact path="/all/comptes" component={ListeCompte} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Home
