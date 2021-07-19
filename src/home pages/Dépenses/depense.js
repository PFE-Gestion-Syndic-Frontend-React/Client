import React, { useEffect } from 'react'
import Util from '../../utils/util'
import HeadingDepense from './headingDepense'
import ListerDepense from './listerDepense'



function Depense() {
    useEffect(()=>{
        Util()
    })
    return (
        <div>
            <HeadingDepense />
            <ListerDepense />
        </div>
    )
}

export default Depense
