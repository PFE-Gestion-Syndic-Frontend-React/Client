import React, { useEffect, useState } from 'react'
import { useHistory} from 'react-router-dom'
import axios from 'axios'
import { Paper, Grow, makeStyles, IconButton, TextField} from '@material-ui/core'
import { UpdateOutlined, InfoOutlined }from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert'



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
    textField : {
        width : "720px"
    },
    paper : {
        margin : "20px",
    },
}))



function ListerLogement() {
    const classes = useStyle()
    const [search, setSearch] = useState('')
    const [logement, setLogement] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/logements/" + search)
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
        }
        else{ 
            axios.get("http://localhost:5001/logements/all")
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
                        <div>{ msg === "No Logements" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucun Logement Pour Cette Recherche "{search}"</Alert></div>}</div>
                        :
                        <div>{ msg === "No Logements" && <div className="col-md-6" style={{marginLeft : "25%"}}><Alert severity="error">Aucun Logement Pour l'Instant</Alert></div>}</div>
                    }
                </div><br/><br/>
            </div><br /><br/>
        </div>
    )
}

export default ListerLogement
