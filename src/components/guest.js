import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Settings from '../guest page/mesSettings/settings'
import NavGuest from '../guest page/navGuest'
import AddRéclamation from '../guest page/Réclamations/addRéclamation'
import EditRéclamation from '../guest page/Réclamations/editRéclamation'
import ListeRéclamation from '../guest page/Réclamations/listeRéclamation'
import MesRéclamations from '../guest page/Réclamations/mesRéclamations'
import Réclamations from '../guest page/Réclamations/réclamations'

function Guest() {
    return (
        <div>
            <Router>
                <div className="fixed-top">
                    <NavGuest />
                </div>
                <div style={{paddingTop : "5%"}}>
                    <Switch>
                        <Route exact path="/réclamation" component={Réclamations} />

                        <Route exact path="/Setting" component={Settings} />


                        <Route exact path="/add-réclamation" component={AddRéclamation} />
                        <Route exact path="/réclamation/edit/:num" component={EditRéclamation}  />
                        <Route exact path="/all/réclamations" component={ListeRéclamation} />
                        <Route exact path="/mes-réclamations" component={MesRéclamations} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Guest
