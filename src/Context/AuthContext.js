import { createContext,useEffect,useState } from "react";
import axios from 'axios'
export const AuthContext = createContext()

export const AuthContextProvider =({children})=>{
const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user'))|| null)

const login = async(inputs)=>{
    // need to be fetched from backend
  const res =  await axios.post('http://localhost:8800/server/auth/login',inputs,{
    withCredentials:true
  })
  setCurrentUser(res.data)
}

useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(currentUser))
},[currentUser])

return(
    <AuthContext.Provider value={{currentUser,login}}>{children}</AuthContext.Provider>
)
}