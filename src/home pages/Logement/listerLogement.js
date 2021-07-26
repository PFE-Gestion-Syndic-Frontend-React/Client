import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import axios from 'axios'
import { Paper, Grow, makeStyles, IconButton, TextField} from '@material-ui/core'
import { UpdateOutlined, InfoOutlined }from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert'




const useStyle = makeStyles((theme) => ({
    alert :{
        width : "100%",
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom : theme.spacing(5),
        },
    },
    textField : {
        width : "720px"
    },
    paper : {
        margin : "20px",
    },
}))



function ListerLogement() {
    const History = useHistory()
    const classes = useStyle()
    const [search, setSearch] = useState('')
    const [logement, setLogement] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(() => {
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
                }
                else if(resolve.data.auth === false){
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }
            }
            else{
                localStorage.clear()
                History.push('/')
                window.location.reload()
            }
        })
        .catch(() => {})

        if(search !== ""){
            const run = axios.get("/logements/" + search)
            .then((response) => {
                if(response.data === "No Logement"){
                    setLogement([])
                    setMsg("No Logements")
                }
                else if(response.data.length > 0){
                    setLogement(response.data)
                    setMsg("data")
                }
                else {
                    setLogement([])
                    setMsg("No Logements")
                }
            })
            .catch(() => {})

            return (() => clearInterval(run))
        }
        else{ 
            const run1 = axios.get("/logements/all")
            .then((response) => {
                if(response.data === "No Logement"){
                    setLogement([])
                    setMsg("No Logements")
                }
                else if(response.data.length > 0){
                    setLogement(response.data)
                    setMsg("data")
                }
                else{
                    setLogement([])
                    setMsg("No Logements")
                }
            })
            .catch(() => {})

            return (() => clearInterval(run1))
        }
    }, [search, History])


    const handleUpdateLog = (RefLog) => {
        return(
            History.push('/logement/edit/' + RefLog)
        )
    }

    const handleInfo = (RefLog) => {
        return (
            History.push('/logement/info/' + RefLog)
        )
    }
    

    return (
        <div>
            <div style={{top : "120px"}}>
                <h1 style={{marginLeft : "200px"}}>Lister Les Logements</h1><br/><br/>
                <div className="container col-md-8 col-md-offset-2"><br/>
                    <div className="container col-md-10 col-md-offset-1">
                        <div className="row">
                            <div>
                                <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Chercher Les Logements..." required className={classes.textField} onChange={e => setSearch(e.target.value)} />
                            </div>
                        </div><br/><br/>
                    </div>
                </div><br/><br/>
                <div className="container col-md-8 col-md-offset-4">
                    {
                        msg === "data" && 
                        <Grow  in={useEffect} timeout={4000}>
                            <Paper className={classes.paper}>
                                <table className="table">
                                    <thead>
                                        <tr className="thead-light">
                                            <th>Nom et Prénom du Copropriétaire</th>
                                            <th>E-mail</th>
                                            <th>Téléphone</th>
                                            <th>Logement</th>
                                            <th style={{textAlign : "center"}} colSpan="2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            logement.length > 0 && 
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
                            </Paper>
                        </Grow>
                    }
                    {
                        search !== "" ?
                        <div>{ msg === "No Logements" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucun Logement Pour Cette Recherche "{search}"</strong></Alert></div>}</div>
                        :
                        <div>{ msg === "No Logements" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error"><strong style={{fontSize : "18px"}}>Aucun Logement Pour l'Instant</strong></Alert></div>}</div>
                    }
                </div><br/><br/>
            </div><br /><br/>
        </div>
    )
}

export default ListerLogement
