import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Avatar, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, CardActions } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { toast } from 'react-toastify';
import { CloudDownloadOutlined }from '@material-ui/icons';

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


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
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}))



function ListerAnnonces() {
    const classes = useStyles()
    const [annonces, setAnnonce] = useState([])
    const [search, setSearch] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        if(search !== ""){
            axios.get("http://localhost:5001/annonces/all/statut/true/" + search)
            .then((response) => {
                if(response.data.msgErr === "No Token Set"){
                    localStorage.clear()
                    History.push('/')
                }
                if(response.data.length > 0){
                    setAnnonce(response.data)
                    setMsg("")
                }
                else {
                    setMsg("No Annonce")
                    setAnnonce(response.data.msggg)
                    toast.warn("Aucune Annonce pour Cette Recherche !")
                }
            })
            .catch(() => {

            })
        }
        else{
            axios.get("http://localhost:5001/annonces/all/statut/true")
            .then((response) => {
                if(response.data.msgErr === "No Token Set"){
                    localStorage.clear()
                    History.push('/')
                }
                if(response.data.length > 0){
                    setAnnonce(response.data)
                }
            })
            .catch((err) => 
            {
                
            })
        }
    }, [search])


    const handleDownload = (fileName) => {
        console.log(fileName)
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
            <div>
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
                                                        <CardContent>
                                                            <Typography variant="body1" color="textPrimary">
                                                                {a.DescripAnnonce}
                                                            </Typography><br/><br/>
                                                            {
                                                                a.contenuDocument !== null &&
                                                                <div>
                                                                    <Avatar src={`annonce doc/${a.contenuDocument}`} alt="" style={{width : "200px", height : "200px"}} />
                                                                    <div style={{marginLeft : "60px"}} onClick={handleDownload.bind(this, a.contenuDocument)} ><IconButton aria-label="Download" aria-labelledby="Download" ><CloudDownloadOutlined style={{width : "50px", height : "50px"}} /> </IconButton></div>
                                                                </div>
                                                            }
                                                        </CardContent>
                                                        <CardActions>
                                                            <Typography variant="body2" color="textSecondary" component="p"> Date Publication : {a.dateAnnonce.replace("T23:00:00.000Z", "")} </Typography>
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
            </div>
        </div>
    )
}

export default ListerAnnonces
