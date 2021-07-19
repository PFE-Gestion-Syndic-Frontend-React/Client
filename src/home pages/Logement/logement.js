import React, { useEffect } from 'react'
import Util from '../../utils/util'
import HeadingLogement from './headingLogement'
import ListerLogement from './listerLogement'




function Logement() {
    useEffect(() => {
        Util()
    })

    return (
        <div style={{paddingTop : "100px"}}>
            <HeadingLogement />
            <ListerLogement />
        </div>
    )
}

export default Logement
