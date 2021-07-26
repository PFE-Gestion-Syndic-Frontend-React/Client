import React, { useEffect } from 'react'
import HeadingDepense from './headingDepense'
import ListerDepense from './listerDepense'
import axios from 'axios'
import { useHistory } from 'react-router'


function Depense() {
    const History = useHistory()

    useEffect(()=>{
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
            <HeadingDepense />
            <ListerDepense />
        </div>
    )
}

export default Depense
