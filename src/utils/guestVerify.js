import axios from 'axios'

export default function GuestVerify() {
    const verifyGuest = () => {
        axios.get("http://localhost:5001/isAuth", {headers : {"authorization" : localStorage.getItem('token')}})
        .then((resolve) => {
            if(resolve.data.role === "Copropriétaire"){

            }
            else if(resolve.data.role !== "Copropriétaire"){
                localStorage.clear()
                History.push('/')
            }
            else if(resolve.data.msg === "Incorrect token !"){
                console.log("Incorrect Token")
                localStorage.clear()
                History.push('/')
            }
            else{ //added
                localStorage.clear()
                History.push('/')
            }
        })
        .catch(() => {})
    }
    verifyGuest()
}
