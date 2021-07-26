import React, { useEffect } from 'react'
import HeadingRec from './headingRec'
import ListeRéclamation from './listeReclamation'
import axios from 'axios'
import { useHistory } from 'react-router'

axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)


function Reclamations() {
    const History = useHistory()

    useEffect(() => {
        axios.get("/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve.data.role === "Copropriétaire"){

            }
            else if(resolve.data.role !== "Copropriétaire"){
                localStorage.clear()
                History.push('/')
            }
            else if(resolve.data.msg === "Incorrect token !"){
                console.log("Incorrect Token")
                localStorage.clear()
                History.push('/')
            }
            else{ //added
                localStorage.clear()
                History.push('/')
            }
        })
        .catch(() => {})
    }, [History])

    return (
        <div>
            <HeadingRec />
            <ListeRéclamation />
        </div>
    )
}

export default Reclamations
