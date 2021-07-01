import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      
      marginRight: theme.spacing(1),
      textAlign : 'center',
      width: "100%",
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: 320,
        },
    },
  }));

function EditDepense() {
    const classes = useStyles()
    const [montant, setMontant] = useState('')
    const [fac, setFac] = useState('')
    const [desc, setDesc] = useState('')

    return (
        <div className="container col-md-6 col-md-offset-3" style={{paddingTop : "90px"}}>
            <div className="card">
                <div className="card-header"><h4 style={{textAlign : "center"}}><i className="bi bi-cash"></i> Modifier Une Dépense</h4></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Nom et Prénom : <strong> Benfarhi Zakaria </strong></label>
                        </div>
                        <div className="col-md-6">
                            <label>Fonction : <strong> Trésorier</strong></label>
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Catégorie : <strong> Jardinage</strong></label>
                        </div>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Montant du Dépense (en MAD)" className={classes.container} defaultValue={"878"} onChange={e => setMontant(e.target.value)}></TextField>
                        </div>
                        <div className="col-md-6">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Facture ou Bon du Dépense" className={classes.container} defaultValue={"N°688H87JJH"} onChange={e => setFac(e.target.value)} />
                        </div>
                    </div><br/><br />
                    <div className="row">
                        <div className="col-md-12">
                            <TextField InputLabelProps={{ shrink: true,}} id="standard-basic" label="Description de la Dépense" multiline={true} className={classes.textField} defaultValue={"sjkdnk skld,l skdlks, dksjdojefoz"} onChange={e => setDesc(e.target.value)} />
                        </div>
                    </div><br/>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/dépenses" className="btn btn-outline-danger form-control">Annuler</Link>
                        </div>
                        <div className="col-md-6">
                            <input type="submit" value="Partager" className="btn btn-primary form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditDepense
