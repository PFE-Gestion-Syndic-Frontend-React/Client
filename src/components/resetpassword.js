import React, {useState} from 'react'
//import axios from 'axios'
import { Link } from 'react-router-dom'

function Resetpassword() {

    const [email, setEmail] = useState('')
    const [tele, setTele] = useState('')

    
    const resetPassword = () => {

    }

    return (
        <div>
            <div className="container col-md-4 col-md-offset-4" style={{paddingTop : "10%"}}>
                <div className="card">
                    <div className="card-body">
                        <h2 style={{textAlign : "center"}}>Reset Password </h2><br/><br/>
                        <div className="row">
                            <div className="col-md-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/></svg>
                            </div>
                            <div className="col-md-9">
                                <input type="email" placeholder="Tapez Votre E-mail" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-ld-1"></div>
                        </div><br />
                        <div className="row">
                            <div className="col-md-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/></svg>   
                            </div>
                            <div className="col-md-9">
                                <input type="text" placeholder="Tapez Votre Numéro de Téléphone" className="form-control" required value={tele} onChange={(e) => setTele(e.target.value)} />
                            </div>
                            <div className="col-md-1"></div>
                        </div><br/><br/>
                        <div>
                        <input type="button" className="form-control btn btn-primary" onClick={resetPassword} value="Valider"  />
                        </div>
                    </div>
                </div>
                <div>
                    <Link style={{textDecoration : "none", textAlign : "center", paddingLeft : "120px"}} to="/">Voulez-Vous s'authentifier ?</Link>
                </div>
            </div>
        </div>
    )
}

export default Resetpassword
