"use client"

import { usePathname } from "next/navigation";
import { api, endpoints } from "../config/server";
import { useRouter } from "next/navigation";

const { createContext, useState, useEffect } = require("react");
 

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
 
  useEffect( () => {
   async function fetchUser(){
    const token = localStorage.getItem("token");
 
    if (token) {

      await api.post(endpoints.verifyAuth, {}, {
        headers: {
          "Content-Type": "application/json",
          "teddy-real-token": `${token}`,
        },
      })
        .then((response) => {
           setUser(response.data);  
          setAuth(true);
            setLoading(false);
        })
        .catch((error) => {
 
          console.error("Token verification error:", error);
          setUser(null);
          setAuth(false);
        })
        .finally(() => {
          setLoading(false);
 
        });
    } else {
      setLoading(false);
    }
   }
    fetchUser()
  }, []);
 
  return (
    
    <AppContext.Provider value={{ user, loading,auth,setAuth,setUser,loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
