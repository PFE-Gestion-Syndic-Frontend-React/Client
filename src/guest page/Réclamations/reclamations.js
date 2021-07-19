import React, { useEffect } from 'react'
import GuestVerify from '../../utils/guestVerify'
import HeadingRec from './headingRec'
import ListeRéclamation from './listeReclamation'
import axios from 'axios'

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
    useEffect(() => {
        GuestVerify()
    })

    return (
        <div>
            <HeadingRec />
            <ListeRéclamation />
        </div>
    )
}

export default Reclamations
