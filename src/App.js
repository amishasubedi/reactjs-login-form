import React, { useState, useEffect } from "react";
import Home from "./Components/Home/Home";
import MainHeader from "./Components/MainHeader/MainHeader";
import Login from "./Components/Login/Login";
import AuthContext from "./Store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // initial condition - ask user to login with their data

  useEffect(() => {
    // useEffect allows you to perform side effects in your components

    // locale storage is a storage mechanism for built in browser
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn"); // extract value either 1 - indicates login or 0 - indicates logout

    // when the page reloads the app function restarts which will take back to login page but the user should be still logged in
    if (storedUserLoggedInInfo === "1") {
      setIsLoggedIn(true); // to load the logged in data
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1"); // storage mechanism for built in browser

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
