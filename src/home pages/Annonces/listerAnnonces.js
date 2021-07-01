import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardHeader, CardContent, CardActions, IconButton } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DeleteOutlined, UpdateOutlined }from '@material-ui/icons';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    alert :{
        flexDirection: 'column',
        width : "150vh",
        '& > *': {
            marginTop: theme.spacing(2),
            marginBottom : theme.spacing(5),
            marginLeft : theme.spacing(51),
            marginRight : theme.spacing(5),
            textAlign : 'center',
            alignItems: 'center',
        },
    },
    root: {
        width: '955px',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        boxShadow : theme.typography,
    },
}))


axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        console.log("No Token")
        return Promise.reject(err)
    }
)



function ListerAnnonces(props) {
    const classes = useStyles()
    const [annonces, setAnnonce] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/annonces/" + search)
            .then((response) => {
                if(response.data.length > 0){
                    setAnnonce(response.data)
                    setMsg("")
                }
                else {
                    setMsg("No Annonce")
                    setAnnonce(response.data.msggg)
                }
            })
            .catch(() => {

            })
        }
        else{
            axios.get("http://localhost:5001/annonces/all")
                .then((response) => {
                    if(response.data.length > 0){
                        setAnnonce(response.data)
                    }
                })
                .catch(() => console.log("No users"))
        }
    }, [search])

    const History = useHistory()
    const updateAnnonce = (refAnnonce) => {
        return(
            History.push(`/annonce/edit/${refAnnonce}`)
        )
    }


    return (
        <div style={{top : "120px"}}>
            <h1 style={{marginLeft : "200px"}}>Lister Les Annonces</h1>
            <div className="container col-md-8 col-md-offset-2"><br/>
                <div className="container col-md-10 col-md-offset-1">
                    <div className="row">
                        <div>
                            <input type="text" placeholder="Chercher Les Annonces..." className="form-control" onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div><br/><br/>
                </div>
            </div>
            {
                msg === "" &&
            
                <div className="container col-md-8 col-md-offset-2">
                    {
                        annonces.map((a) => {
                            return(
                                <div>
                                    <Accordion key={a.RefAnnonce} className="mb-5">
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                            <Typography className={classes.heading}> <h5 style={{color : "blue"}}><strong>{a.Sujet}</strong></h5>  </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography spacing={3}>
                                                <Card className={classes.root} elevation={1}>
                                                    <CardHeader action={ <div> <IconButton onClick={ updateAnnonce.bind(this, a.RefAnnonce) }  ><UpdateOutlined style={{color : "green", fontSize : "30px"}} /></IconButton><IconButton onClick={() => console.log("delete", a.RefAnnonce)}><DeleteOutlined style={{color : "red", fontSize : "30px"}} /> </IconButton> </div> } 
                                                                subheader={`Publié par : ${a.NomCompte} ${a.PrenomCompte}`} />
                                                    <CardContent>
                                                        <Typography variant="body1" color="textPrimary">
                                                            {a.DescripAnnonce}
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Typography variant="body2" color="textSecondary" component="p"> Date Publication : {a.dateAnnonce} </Typography>
                                                    </CardActions>
                                                </Card>
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            )
                        })
                    }
                
                </div>
            }
            {
                msg === "No Annonce" && 
                <div className={classes.alert} style={{textAlignLast :'center'}}>
                    <Alert severity="error">Aucune Annonce pour cette recherche : {search} </Alert>
                </div>
            }
        </div>
    )
}

export default ListerAnnonces
