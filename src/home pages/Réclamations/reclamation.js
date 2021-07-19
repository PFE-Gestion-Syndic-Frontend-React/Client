import React, { useEffect } from 'react'
import Util from '../../utils/util'
import ListerReclamation from './listerReclamation'


function Reclamation() {
    useEffect(()=>{
        Util()
    })
    return (
        <div>
            <ListerReclamation />
        </div>
    )
}

export default Reclamation
