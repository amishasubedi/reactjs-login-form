import React from "react";

// AuthContext is an object that contains a component
const AuthContext = React.createContext({
  // create context object
  isLoggedIn: false,
});

export default AuthContext;
