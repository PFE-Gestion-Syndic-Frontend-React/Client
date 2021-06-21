import React, { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

function AddCompte(props) {

    const [nom, setNom] = useState('')
    const [prenom, setPrenom] = useState('')
    const [email, setEmail] = useState('')
    const [tele, setTele] = useState('')
    const [role, setRole] = useState('Copropriétaire')
    const [fonc, setFonc] = useState('')
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('')
    //  const [up, setup] = useState({})
    const [msg, setMsg] = useState('')

    const change = e => { 
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const createAccount =  () => {

        /*const data = new FormData()
        data.append("file", photo)
        try{
            const res = await axios.post("http://localhost:5001/up", data, { headers : { 'Content-Type' : 'multipart/form-data' } })
            const {fileName, filePath} = res.data
            setup({fileName, filePath})
        }
        catch(err){
            if(err.response.status === 500){
                console.log("Prob")
            }
            else{
                console.log(err.response.data.msg)
            }
        }

        if(up !== null && up !== "")
        {*/
            if(nom !== "" && prenom !=="" && email !== "" && tele !== "" && role !== "" && fonc !== ""){
                const datasend = {nom : nom, prenom : prenom, email : email, tele : tele, role : role, fonc : fonc}
                axios.post("http://localhost:5001/users/new", datasend)
                .then((resolve) => {
                    if(resolve.data.message === "Inserted"){
                        setMsg("Le Compte est enregistré avec Success")
                        props.history.push('/all/comptes')
                    }
                    else if(resolve.data.messageErr === "E-mail Already Used !"){
                        setMsg("E-mail est déjà utilisé !!")
                    }
                })
                .catch((err) => console.log(err))
            }
            else{
                setMsg("Champs Obligatoires !")
            }
            console.log(file)
            console.log(fileName)
        //}
    }

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-person-circle"></i> Création d'un Compte</h4></div>
                <div className="card-body">
                    <div>
                        {
                            msg === "Le Compte est enregistré avec Success" && <div className="alert alert-success text-center">{msg}</div>
                        }
                    </div>
                    <div>
                        {
                            msg === "E-mail est déjà utilisé !!" && <div className="alert alert-danger text-center">{msg}</div>
                        }
                    </div>
                    <div>
                        {
                            msg === "Champs Obligatoires !" && <div className="alert alert-warning text-center">{msg}</div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Nom" onChange={(e) => setNom(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Prénom" onChange={(e) => setPrenom(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <input type="email" className="form-control" placeholder="Votre E-mail" onChange={e => setEmail(e.target.value)}  />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Votre Téléphone" onChange={e => setTele(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-2">
                            <label style={{fontSize : "20px"}}>Role : </label>
                        </div>
                        <div className="col-md-4">
                           <select className="form-control" onChange={e=> setRole(e.target.value)}>
                               <option value="Copropriétaire" >Copropriétaire</option>
                               <option value="Administrateur">Administrateur</option>
                           </select>
                        </div>
                        <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Votre Fonction au sein du Syndicat..." onChange={e => setFonc(e.target.value)} />
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <label style={{fontSize : "20px"}}>Sélectionner Votre Avatare : </label>
                        </div>
                        <div className="col-md-6">
                            <input type="file" accept=".png" className="form-control" onChange={change} />
                        </div>
                    </div><br /><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/comptes" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Enregistrer" onClick={createAccount} className="form-control btn btn-primary" />
                        </div>
                    </div>
                </div>
            </div><br/><br/><br/><br/>
        </div>
    )
}

export default AddCompte
