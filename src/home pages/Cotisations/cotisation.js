import React, { useEffect } from 'react'
import HeadingCotisasion from './headingCotisasion'
import ListerCotisation from './listerCotisation'
import Util from '../../utils/util'



function Cotisation() {

    useEffect(() =>{
        Util()
    })

    return (
        <div>
            <HeadingCotisasion />
            <ListerCotisation />
        </div>
    )
}

export default Cotisation
