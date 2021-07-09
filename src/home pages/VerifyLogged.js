import axios from 'axios'
import React, { useEffect } from 'react'

function VerifyLogged(props) {

    const token = localStorage.getItem('token')
    useEffect(() => {
        if(token){
            axios.get("http://localhost:5001/tokens/verify")
            .then((resolve) => {
                console.log(resolve)
            })
            .catch(() => {

            })
        }
        else{
            props.history.push('/')
        }
    }, [token])

    return (
        <div>

        </div>
    )
}

export default VerifyLogged
