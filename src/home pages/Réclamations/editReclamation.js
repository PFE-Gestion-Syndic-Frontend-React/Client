import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormHelperText } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop : theme.spacing(1),
      textAlign : 'center',
      width: "95%",
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 320,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: 700,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
  }));


function EditReclamation(props) {
    const classes = useStyles()
    const [etat, setEtat] = useState('')
    const [reclamation, setReclamation] = useState({})

    useEffect(() => {
        const refReclamation = props.match.params.refReclamation
        if(refReclamation !== ""){
            axios.get(`http://localhost:5001/reclamations/reclamation/${refReclamation}`)
            .then(res => 
            {
                if(res.data.msgErr === "Not Found"){
                    setReclamation({})
                }
                else{
                    setReclamation(res.data[0])
                }
            })
            .catch(() => console.log("Cannot Read Data"))
        }
    }, [])


    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card" key={reclamation.refReclamation} >
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-clipboard-check"></i> Modifier Une Réclamation</h4></div>
                <div className="card-body">
                    <div className="row">
                        <label>Objet : {reclamation.Objet} </label>
                    </div><br/>
                    <div className="row">
                        <label>Description : {reclamation.Message} </label>
                    </div><br />
                    <div className="row container">
                        <FormControl className={classes.formControl}>
                            <FormHelperText>Etat de Réclamation</FormHelperText>
                            <Select style={{width : "100%"}} onChange={e => setEtat(e.target.value)} displayEmpty className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }} >
                                <MenuItem value="" disabled> Etat de Réclamation </MenuItem>
                                <MenuItem value={"En Cours"}>En Cours</MenuItem>
                                <MenuItem value={"Résolue"}>Résolue</MenuItem>
                                <MenuItem value={"Non Résolue"}>Non Résolue</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div><br/>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/réclamations" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Valider" className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditReclamation
