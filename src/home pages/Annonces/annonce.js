import React, { useEffect } from 'react'
import HeadingAnnonce from './headingAnnonce'
import ListerAnnonces from './listerAnnonces'
import Util from '../../utils/util'


function Annonce(props) {

    useEffect(() => {
        Util()
    })


    return(
        <div>
            <HeadingAnnonce />
            <ListerAnnonces />
        </div>

    )
}

export default Annonce
