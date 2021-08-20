import React from 'react';
import {CssBaseline, Typography, Container, Tooltip, IconButton} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GitHub, Facebook, LinkedIn, WhatsApp } from '@material-ui/icons'

function Copyright() {
  return (
    <Typography style={{textAlign : "center"}} variant="body2" color="textSecondary">
      {'Copyright © '} {' '} {new Date().getFullYear()} {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}><br/>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container component="main" className={classes.main} maxWidth="sm">
            <Typography style={{textAlign : "center"}} variant="h2" component="h1" gutterBottom>G.S.C. Application</Typography>
            <Typography style={{textAlign : "center"}} variant="h5" component="h2" gutterBottom>{'Developped by BENFARHI Zakaria'} </Typography>
            <Typography style={{textAlign : "center"}}>
                <Tooltip title="GitHub"><IconButton><GitHub style={{color : "black", width : "35px", height : "35px"}} /></IconButton></Tooltip>
                <Tooltip title="Facebook"><IconButton><Facebook style={{color : "blue", width : "35px", height : "35px"}} /></IconButton></Tooltip>
                <Tooltip title="Whatsapp"><IconButton><WhatsApp style={{color : "green", width : "35px", height : "35px"}} /></IconButton></Tooltip>
                <Tooltip title="LinkedIn"><IconButton><LinkedIn style={{color : "blueviolet", width : "35px", height : "35px"}} /></IconButton></Tooltip>
            </Typography>
            <Copyright />
        </Container>
      </footer>
    </div>
  );
}

export default Footer 