import React, { useEffect } from 'react'
import HeadingAnnonce from './headingAnnonce'
import ListerAnnonces from './listerAnnonces'
import axios from 'axios'
import { useHistory } from 'react-router'


function Annonce(props) {
    const History = useHistory()
    useEffect(() => {
        axios.get("/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve){
                if(resolve.data.role === "Administrateur"){
                    console.log("Yes Authenticated")
                }
                else if(resolve.data.role !== "Administrateur"){
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }
                else if(resolve.data.msg === "Incorrect token !"){
                    console.log("Incorrect Token")
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }
                else if(resolve.data.auth === false){
                    localStorage.clear()
                    History.push('/')
                    window.location.reload()
                }
            }
            else{
                localStorage.clear()
                History.push('/')
                window.location.reload()
            }
        })
        .catch(() => {})
    }, [History])


    return(
        <div>
            <HeadingAnnonce />
            <ListerAnnonces />
        </div>

    )
}

export default Annonce
