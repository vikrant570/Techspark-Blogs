import { createContext, useState, useContext, useEffect } from "react";
import { getMyInfo } from "./server/loginRegister";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //OBTAINING USER WHEN LOGGED IN STATE HAS CHANGED AND PASSING TO THE WHOLE CHILDREN
  useEffect((e)=>{
    const getUser = async () =>{
      const data = await getMyInfo(e);
      if(data == false){
        setIsLoggedIn(false);
        return
      } else if(data.user){
        setUser(data.user);
        setIsLoggedIn(true);
      }
    }
    getUser();
  },[isLoggedIn]);

  return (
    <AppContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);