import { createContext,useEffect,useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider =({children})=>{
const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem('user'))|| null)

const login = ()=>{
    // need to be fetched from backend
    setCurrentUser({id:1,name:'Ehsan Espandar',profilePic:'https://images.pexels.com/photos/18704284/pexels-photo-18704284.jpeg?cs=srgb&dl=pexels-phong-vo-18704284.jpg&fm=jpg'})
}

useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(currentUser))
},[currentUser])

return(
    <AuthContext.Provider value={{currentUser,login}}>{children}</AuthContext.Provider>
)
}