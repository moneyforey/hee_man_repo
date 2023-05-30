import { createContext, useState } from "react";

export const WithdrawalContext = createContext();
export const WithdrawalContextProvider = ({children}) => {
    const [is,setIs] = useState("hello");
    // console.log("in provider",is);
    return (
        <WithdrawalContext.Provider value={{is}}>
         {children}
        </WithdrawalContext.Provider>
    );
};
