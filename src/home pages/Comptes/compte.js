import React from 'react'
import ListeCompte from './listeCompte'
import Heading from './heading'
import verifyToken from '../../Utils/util'

function Compte(props) {
    if(verifyToken === false){
        console.log("Not Authenticated")
        props.history.push('/')
    }

    return (
        <div style={{paddingTop : "100px"}}>
            <Heading />
            <ListeCompte />   
        </div>
    )
}

export default Compte
