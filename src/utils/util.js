import axios from 'axios'
import { toast } from 'react-toastify'

export default function Util() {
    const verifyAdmin = () => {
        axios.get("http://localhost:5001/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve){
                if(resolve.data.role === "Administrateur"){
                    console.log("Yes Authenticated")
                }
                else if(resolve.data.role !== "Administrateur"){
                    localStorage.clear()
                    History.push('/')
                }
                else if(resolve.data.msg === "Incorrect token !"){
                    console.log("Incorrect Token")
                    localStorage.clear()
                    History.push('/')
                }
            }
            else{
                localStorage.clear()
                History.push('/')
            }
        })
        .catch(() => {})

        if(!localStorage.getItem('token')){
            History.push('/')
        }
    }
    verifyAdmin()
}

