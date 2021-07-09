import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import axios from 'axios'
import {  Accordion, AccordionSummary, AccordionDetails, makeStyles, IconButton} from '@material-ui/core'
import { UpdateOutlined, InfoOutlined }from '@material-ui/icons';
import {toast} from 'react-toastify'



axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


const useStyle = makeStyles((theme) => ({
    alert :{
        width : "100%",
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom : theme.spacing(5),
        },
    },
}))



function ListerLogement() {
    const classes = useStyle()
    const [search, setSearch] = useState('')
    const [logement, setLogement] = useState()
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/logements/" + search)
            .then((response) => {
                if(response.data.length > 0){
                    setLogement(response.data)
                    setMsg("founded")
                }
                else {
                    setMsg("No Logements")
                    setLogement(response.data.msggg)
                    toast.warn("Aucun Logemenet pour cette Recherche !")
                }
                
            })
            .catch(() => {

            })
        }
        else{ 
            axios.get("http://localhost:5001/logements/all")
            .then((response) => {
                if(response.data.length > 0){
                    setLogement(response.data)
                    setMsg("founded")
                }
            })
            .catch(() => console.log("No Logements"))
        }
    }, [search])


    const history = useHistory()
    const handleUpdateLog = (RefLog) => {
        return(
            history.push('/logement/edit/' + RefLog)
        )
    }

    const handleInfo = (RefLog) => {
        return (
            history.push('/logement/info/' + RefLog)
        )
    }
    

    return (
        <div>
            <div style={{top : "120px"}}>
                <h1 style={{marginLeft : "200px"}}>Lister Les Logements</h1>
                <div className="container col-md-8 col-md-offset-2"><br/>
                    <div className="container col-md-10 col-md-offset-1">
                        <div className="row">
                            <div>
                                <input type="text" placeholder="Chercher Les Logements..." className="form-control" onChange={e => setSearch(e.target.value)}  />
                            </div>
                        </div><br/><br/>
                    </div>
                </div>
                <div className="container col-md-8 col-md-offset-4">
                    {
                        msg === "founded" && 
                        <table className="table">
                            <thead>
                                <tr className="thead-light">
                                    <th>Nom et Prénom du Copropriétaire</th>
                                    <th>E-mail</th>
                                    <th>Téléphone</th>
                                    <th>Logement</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    logement.map((l) => {
                                        return (
                                            <tr key={l.RefLogement}>
                                                <td> {l.NomCompte} {l.PrenomCompte} </td>
                                                <td> {l.EmailCompte} </td>
                                                <td> {l.telephone} </td>
                                                <td> {l.RefLogement} </td>
                                                <td><IconButton onClick={handleUpdateLog.bind(this, l.RefLogement)}><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton></td>
                                                <td><IconButton onClick={handleInfo.bind(this, l.RefLogement)}><InfoOutlined style={{color : "blue", fontSize : "30px"}} /></IconButton></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    }
                </div><br/><br/>
            </div><br /><br/>
        </div>
    )
}

export default ListerLogement
