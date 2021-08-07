import React, {useState} from 'react'
import {TextField, Avatar, CssBaseline, Button, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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



function NewPassword(props) {
    const classes = useStyles()
    const [pwd, setPwd] = useState('')
    const [confPwd, setConfPwd] = useState('')
    const email = props.match.params.email
    const tele = props.match.params.tele
    const id = props.match.params.id

    console.log(email, " - ", tele, " - ", id)
    const newPassword = () => {

    }

    return (
        <div style={{paddingTop : "6%"}}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Avatar src={'G.S.C.png'} alt="" style={{width : "150px", height : "150px", marginLeft : "30%"}} />
                <div className={classes.paper}>
                    <div className={classes.root} noValidate>
                        <TextField InputLabelProps={{ shrink: true,}} margin="normal" required fullWidth id="standard-basic" label="New Password" name="password" autoFocus onChange={(e) => setPwd(e.target.value)} />
                        <TextField InputLabelProps={{ shrink: true,}} margin="normal" required fullWidth name="Confirme Password" label="Confirme Password" type="password" id="standard-basic" autoComplete="current-password" onChange={(e) => setConfPwd(e.target.value)} />
                        <Button type="submit" fullWidth variant="contained" color="primary" onClick={newPassword} className={classes.submit}> Valider </Button>
                    </div>
                </div>
            </Container>                    
        </div>
    )
}

export default NewPassword
