import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {TextField, Avatar, CssBaseline, Button, Container, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    alert :{
        width : "100%",
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom : theme.spacing(5),
        },
    },
    root : {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function Resetpassword() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [tele, setTele] = useState('')
    const [msg, setMsg] = useState('')
    
    const resetPassword = () => {
        if(email === "" || tele === ""){
            toast.warn("Les Champs qui ont (*) sont Obligatoires")
            setMsg("")
        }
        else if(email !== "" && tele !== ""){
            axios.get(`/resetpwd/${email}/${tele}`)
            .then((res) => {
                if(res.data === "Verify Your Email"){
                    setMsg('Verify')
                    toast.success("Merci de Vérifier Votre Courrier !")
                }
                else if(res.data === "Unfounded User"){
                    setMsg('Not Found')
                }
            })
            .catch(() => {})
        }
        else{
            setMsg("")
        }
    }

    return (
        <div style={{paddingTop : "6%"}}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Avatar src={'G.S.C.png'} alt="" style={{width : "150px", height : "150px", marginLeft : "30%"}} /><br/><br/>
                {
                    msg === "Verify" &&
                    <div><Alert severity="success" style={{textAlign : "center"}}>Merci de vérifier votre Courrier</Alert></div>
                }
                {
                    msg === "Not Found" && 
                    <div><Alert severity="error" style={{textAlign : "center"}}>Utilisateur Introuvable</Alert></div>
                }
                {
                    msg === "" && <div></div>
                }
                <div className={classes.paper}>
                    <div className={classes.root} noValidate>
                        <TextField InputLabelProps={{ shrink: true,}} margin="normal" required fullWidth id="standard-basic" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(e) => setEmail(e.target.value)} />
                        <TextField InputLabelProps={{ shrink: true,}} margin="normal" required fullWidth name="Téléphone" label="Téléphone" type="text" id="standard-basic" autoComplete="current-password" onChange={(e) => setTele(e.target.value)} />
                        <Button type="submit" fullWidth variant="contained" color="primary" onClick={resetPassword} className={classes.submit}> Reset </Button>
                        <Grid container style={{textAlign : "center"}}>
                            <Grid item xs>
                                <Link to="/" style={{textDecoration : "none"}} variant="body2"> Voulez-Vous s'Authentifié ? </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>                    
        </div>
    )
}

export default Resetpassword
