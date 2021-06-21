import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'



function Login(props) {

    const [email, setEmail] = useState('')
    const [pwd, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const connect = () => {
        axios.post("http://localhost:5001/",  { withCredentials : true , email : email, pwd : pwd })
        .then((resolve)=> {
            if(email !== "" && pwd !== ""){
                if(resolve){
                    //console.log(resolve)
                    if(resolve.data.msgErr){
                        console.log(resolve.data.msgErr)
                        setMsg("Password or Email is incorrect !")
                    }
                    console.log(resolve.data)
                    if(resolve.data.data[0]){
                        if(resolve.data.data[0].Role === "Administrateur"){
                            localStorage.getItem(resolve.data.token)
                            props.history.push('/home')
                        }
                        else if(resolve.data.data[0].Role === "Copropriétaire"){
                            localStorage.getItem(resolve.data.token)
                            props.history.push('/acceuil')
                        }
                    }
                }
                else{
                    setMsg("User does not Existe")
                    console.log("User does not Existe")
                }
            }
            else{
                setMsg("All Field Required")
                console.log("All Field Required")
            }
        })
        .catch((err) => console.log(err))
    }
    return (
        <div>
            <div className="container col-md-4 col-md-offset-4" style={{paddingTop : '10%'}}>
                <div className=" align-items-center" >
                    <div className="card">
                        <div>
                            {msg === "Password or Email is incorrect !" && <div className="alert alert-danger text-center"><strong>Password ou l'E-mail est Incorrect !</strong> </div>}
                        </div>
                        <div>
                        {msg === "All Field Required" && <div className="alert alert-danger text-center"><strong>Tous Les Champs Obligatoires</strong> </div>}
                        </div>
                        <div>
                            {msg === "Authenticated" && <div className="alert alert-success text-center">Authenticated with Success</div>}
                        </div>
                        <div>
                            {msg === "User does not Existe" && <div className="alert alert-danger text-center">{msg}</div>}
                        </div>
                        <div className="card-body">
                            <h2 className="text-center">Authentication</h2><br/><br/>
                            <div className="row">
                                <div className="col-md-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16"><path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/></svg>
                                </div>
                                <div className="col-md-9">
                                    <input type="email" placeholder="Tapez Votre E-mail" className="form-control"  required="required" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col-ld-1"></div>
                            </div><br />
                            <div className="row">
                                <div className="col-md-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-shield-lock-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/></svg>                          </div>
                                <div className="col-md-9">
                                    <input type="password" className="form-control" placeholder="Votre Mot de Passe" required="required" value={pwd} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="col-md-1"></div>
                            </div><br/><br/>
                            <div>
                                <input type="button" className="form-control btn btn-primary" onClick={connect} value="Login"  />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link style={{textDecoration : "none", textAlign : "center", paddingLeft : "120px"}} to="/reset-password">Avez-Vous oublié votre mot de passe ?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
