import axios from "axios";
import React, { createContext } from "react";

export const AuthContext = createContext();

// children will be wrapped with this AuthContext provider; in our case, children will be the App component
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = (inputs) => {
        return axios.post('auth/login', inputs)
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data))
                setCurrentUser(res.data)
            })
    }

    const logout = () => {
        axios.post('auth/logout')
        localStorage.setItem('user', JSON.stringify(null))
        setCurrentUser(null)
    }


    return (
        <AuthContext.Provider value ={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}