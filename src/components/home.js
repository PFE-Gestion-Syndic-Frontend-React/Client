import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'
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
import AddDepense from '../home pages/Dépenses/addDepense'
import EditDepense from '../home pages/Dépenses/editDepense'
import ListerDepense from '../home pages/Dépenses/listerDepense'
import Login from './login'
import Statistique from '../home pages/Statistique/statistique'
import Logement from '../home pages/Logement/logement'
import EditLogement from '../home pages/Logement/editLogement'
import ListerLogement from '../home pages/Logement/listerLogement'
import AddLogement from '../home pages/Logement/addLogement'
import axios from 'axios'
import InfoLogement from '../home pages/Logement/infoLogement'
import ReleveFinancier from '../home pages/Statistique/releveFinancier'
import LesImpayes from '../home pages/Cotisations/lesImpayes'
//import Util from '../utils/util'

function Home(props) {
    const History = useHistory()
    useEffect(() => {
        if(!localStorage.getItem('token')){
            History.push('/')
            window.location.reload()
        }
        axios.get("/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve){
                if(resolve.data.role === "Administrateur"){
                    console.log("Yes Authenticated")
                }
                else if(resolve.data.role !== "Administrateur"){
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }
                else if(resolve.data.msg === "Incorrect token !"){
                    console.log("Incorrect Token")
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }// added
            }
            else{
                localStorage.clear()
                History.push('/')
                window.location.reload()
            }
        })
        .catch(() => {})

    }, [History])

    return (
        <div>
            <Router>
                <div className="fixed-top">
                    <Nav /> 
                </div>
                <div style={{paddingTop : '5%'}}>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/Home" component={Statistique} />
                        <Route exact path="/relevé-financièr" component={ReleveFinancier} />

                        <Route exact path="/dépenses" component={Depense} />
                        <Route exact path="/cotisations" component={Cotisation} />
                        <Route exact path="/annonces" component={Annonce} />
                        <Route exact path="/réclamations" component={Reclamation} />
                        <Route exact path="/comptes" component={Compte} />
                        <Route exact path="/logement" component={Logement} />
                        <Route exact path="/settings" component={Settings} />

                        <Route exact path="/add-dépense" component={AddDepense} />
                        <Route exact path="/dépense/edit/:refDepense" component={EditDepense} />
                        <Route exact path="/all/dépenses" component={ListerDepense} />

                        <Route exact path="/add-cotisation" component={AddCotisation} /> 
                        <Route exact path="/cotisation/edit/:RefPaiement" component={EditCotisation} />
                        <Route exact path="/all/cotisations" component={ListerCotisation} />                 
                        <Route exact path="/les-impayés" component={LesImpayes} />

                        <Route exact path="/add-annonce" component={AddAnnonce} />
                        <Route exact path="/annonce/edit/:refAnnonce" component={EditAnnonce} />
                        <Route exact path="/all/annonces" component={ListerAnnonces} />

                        <Route exact path="/réclamation/edit/:refReclamation" component={EditReclamation} />

                        <Route exact path="/add-compte" component={AddCompte} />
                        <Route exact path="/compte/edit/:id" component={EditCompte} />
                        <Route exact path="/all/comptes" component={ListeCompte} />

                        <Route exact path="/add-logement" component={AddLogement} />
                        <Route exact path="/logement/edit/:refLogement" component={EditLogement} />
                        <Route exact path="/all/logements" component={ListerLogement} />
                        <Route exact path="/logement/info/:refLogement" component={InfoLogement} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Home
