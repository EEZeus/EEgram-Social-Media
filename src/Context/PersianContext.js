import { createContext,useEffect,useState } from "react";

export const PersianContext = createContext()

export const PersianContextProvider =({children})=>{
const [persian,setPersian] = useState(JSON.parse(localStorage.getItem('persian'))|| false)

const toggleFa = ()=>{
    setPersian(!persian)
}

useEffect(()=>{
    localStorage.setItem('persian',persian)
},[persian])

return(
    <PersianContext.Provider value={{persian,toggleFa}}>{children}</PersianContext.Provider>
)
}