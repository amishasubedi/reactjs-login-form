import React, { useContext } from "react";
import Home from "./Components/Home/Home";
import MainHeader from "./Components/MainHeader/MainHeader";
import Login from "./Components/Login/Login";
import AuthContext from "./Store/auth-context";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
