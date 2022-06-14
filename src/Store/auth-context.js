import React, { useState, useEffect } from "react";

// AuthContext is an object that contains a component
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout = () => {},
  onLogin: (email, password) => {}
});


export const AuthContextProvider = props => {
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // useEffect allows you to perform side effects in your components

    // locale storage is a storage mechanism for built in browser
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn"); // extract value either 1 - indicates login or 0 - indicates logout

    // when the page reloads the app function restarts which will take back to login page but the user should be still logged in
    if (storedUserLoggedInInfo === "1") {
      setIsLoggedIn(true); // to load the logged in data
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }

  const loginHandler = () => {
    localStorage.setItem(isLoggedIn);
    setIsLoggedIn(true);
  }
}
export default AuthContext;
