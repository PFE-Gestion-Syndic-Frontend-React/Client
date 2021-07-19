import React, { useEffect } from 'react'
import ListeCompte from './listeCompte'
import Heading from './heading'
import Util from '../../utils/util'



function Compte(props) {

    useEffect(() =>{
        Util()
    })


    return (
        <div style={{paddingTop : "100px"}}>
            <Heading />
            <ListeCompte />   
        </div>
    )
}

export default Compte
