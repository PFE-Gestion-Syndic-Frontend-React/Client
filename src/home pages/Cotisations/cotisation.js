import React, { useEffect } from 'react'
import HeadingCotisasion from './headingCotisasion'
import ListerCotisation from './listerCotisation'
import axios from 'axios'
import { useHistory } from 'react-router'



function Cotisation() {
    const History = useHistory() 

    useEffect(() =>{
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

    return (
        <div>
            <HeadingCotisasion />
            <ListerCotisation />
        </div>
    )
}

export default Cotisation
