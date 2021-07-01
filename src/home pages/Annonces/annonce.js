import React from 'react'
import HeadingAnnonce from './headingAnnonce'
import ListerAnnonces from './listerAnnonces'
import verifyToken from '../../Utils/util'


function Annonce(props) {
    if(verifyToken === false){
        console.log("Not Authenticated")
        
    }
    return (
        <div>
            <HeadingAnnonce />
            <ListerAnnonces />
        </div>
    )
}

export default Annonce
