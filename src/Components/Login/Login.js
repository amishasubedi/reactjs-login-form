import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button";
import AuthContext from "../../Store/auth-context";
import Input from "../UI/Input/Input";

// grouping small state together and managing in one place - useReducer
// this method combines entered email and its validity together
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

// password entered and its validity
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailsState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // understanding useEffect
  useEffect(() => {
    console.log("Effect running");

    return () => {
      console.log("Effect clean up");
    };
  }, []);

  const { isValid: emailIsValid } = emailsState;
  const { isValid: passwordIsValid } = passwordState;

  // After every login component function execution, useEffect runs only if either setform is valid or enteredEmail or entered password
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("Checking form validity"); // this executes with every key stroke- not an ideal way - solution ?
      //- debouncing user input
      // updating the state
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500); // but we should have one ongoing timer at a time

    // clean up process - this runs before every new side effect function execution but doesnot run before the first side effect function execution
    return () => {
      console.log("Clean up");
      clearTimeout(handler); // clears the timer that was set
    };
    // this will rerun only if the validity changes not a single value
  }, [emailIsValid, passwordIsValid]); // entered email and password are dependencies - useEffect runs when dependencies are reevaluated

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "user-input", val: event.target.value }); // val to store what user entered

    //setFormIsValid(event.target.value.includes("@") && emailsState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "user-input", val: event.target.value });

    //setFormIsValid(
    // enteredEmail.includes('@') && event.target.value.trim().length > 6
    //passwordState.isValid && event.target.value.trim().length > 6
    //);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "input-blur" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "input-blur" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    if (formIsValid) {
      authCtx.onLogin(emailsState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailsState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
