import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
import ListerAnnonces from '../guest page/Annonces/listerAnnonces'
import ListerDepenses from '../guest page/Depenses/listerDepenses'
import Settings from '../guest page/mesSettings/settings'
import NavGuest from '../guest page/navGuest'
import ListerMesPaiements from '../guest page/Paiements/listerMesPaiements'
import AddReclamation from '../guest page/Réclamations/addReclamation'
import EditReclamation from '../guest page/Réclamations/editReclamation'
import ListeReclamation from '../guest page/Réclamations/listeReclamation'
import MesReclamations from '../guest page/Réclamations/mesReclamations'
import Reclamations from '../guest page/Réclamations/reclamations'
import Statistique from '../guest page/Statistique/statistique'
import ReleveFinancier from '../guest page/Statistique/releveFinancier'
import Login from './login'
import axios from 'axios'

function Guest(props) {
    const history = useHistory()
    useEffect(() => {
        axios.get("/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve.data.role === "Copropriétaire"){

            }
            else if(resolve.data.role !== "Copropriétaire"){
                localStorage.clear()
                history.push('/')
            }
            else if(resolve.data.msg === "Incorrect token !"){
                console.log("Incorrect Token")
                localStorage.clear()
                history.push('/')
            }
            else{ //added
                localStorage.clear()
                history.push('/')
            }
        })
        .catch(() => {})
    })


    return (
        <div>
            <Router>
                <div className="fixed-top">
                    <NavGuest />
                </div>
                <div style={{paddingTop : "5%"}}>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/Acceuil" component={Statistique} />
                        <Route exact path="/relevé-financièr" component={ReleveFinancier} />
                        <Route exact path="/Annonces" component={ListerAnnonces} />
                        <Route exact path="/Dépenses" component={ListerDepenses} />
                        <Route exact path="/Settings" component={Settings} />
                        <Route exact path="/Cotisations" component={ListerMesPaiements} />
                        <Route exact path="/Réclamations" component={Reclamations} />


                        <Route exact path="/add-réclamation" component={AddReclamation} />
                        <Route exact path="/réclamation/edit/:num" component={EditReclamation}  />
                        <Route exact path="/all/réclamations" component={ListeReclamation} />
                        <Route exact path="/mes-réclamations" component={MesReclamations} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Guest
