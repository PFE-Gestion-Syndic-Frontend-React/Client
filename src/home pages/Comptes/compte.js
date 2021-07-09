import React from 'react'
import ListeCompte from './listeCompte'
import Heading from './heading'

function Compte(props) {
    
    return (
        <div style={{paddingTop : "100px"}}>
            <Heading />
            <ListeCompte />   
        </div>
    )
}

export default Compte
