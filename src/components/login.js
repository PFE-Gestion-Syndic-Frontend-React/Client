import React, { useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {TextField, Avatar, CssBaseline, Button, Container, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'


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

function Login(props) {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [pwd, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    
    if(msg){}

    const connect = () => {
        if(email !== "" && pwd !== ""){
            axios.post("/login",  { withCredentials : true , email : email, pwd : pwd })
            .then((resolve)=> {
                if(resolve){
                    if(resolve.data.msgErr){
                        setMsg("Password or Email is incorrect !")
                        toast.error("Password or Email is Incorrect !")
                    }
                    if(resolve.data.data[0] && resolve.data.token){
                        localStorage.setItem("token", resolve.data.token)
                        localStorage.setItem('id', resolve.data.data[0].NumCompte)
                        if(resolve.data.data[0].Role === "Administrateur" && localStorage.getItem("token")){
                            props.history.push('/home', {data : resolve.data.data[0]})
                            toast.success('Logged in Successfully', {position : toast.POSITION.TOP_CENTER})
                        }
                        else if(resolve.data.data[0].Role === "Copropriétaire" && localStorage.getItem("token")){
                            props.history.push('/Acceuil', {data : resolve.data.data[0]})
                            toast.success('Logged in Successfully', {position : toast.POSITION.TOP_CENTER})
                        }
                        else{
                            props.history.push('/')
                        }
                    }
                }
                else{
                    setMsg("User does not Existe")
                    toast.warn('Utilisateur Inrouvable !')
                }
            })
            .catch((err) => console.log(err))
        }
        else{
            setMsg("All Field Required")
            toast.warn('Les Champs qui ont (*) sont Obligatoires')
        }
    }
    return (
        <div style={{paddingTop : "6%"}}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Avatar src={'G.S.C.png'} alt="" style={{width : "150px", height : "150px", marginLeft : "30%"}} />
                <div className={classes.paper}>
                    <div className={classes.root} noValidate>
                        <TextField InputLabelProps={{ shrink: true,}} margin="normal" required fullwidth id="standard-basic" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(e) => setEmail(e.target.value)} />
                        <TextField InputLabelProps={{ shrink: true,}} margin="normal" required fullwidth name="password" label="Password" type="password" id="standard-basic" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" fullwidth variant="contained" color="primary" onClick={connect} className={classes.submit}> Login </Button>
                        <Grid container style={{textAlign : "center"}}>
                            <Grid item xs>
                                <Link to="/reset-password" style={{textDecoration : "none"}} variant="body2"> Avez-Vous oublié votre mot de passe ? </Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>                    
        </div>
    )
}

export default Login
