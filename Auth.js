import React, { useEffect, useRef, useState } from "react";
import { signup, login } from "../redux/ExpenseSlice";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEmailInvalid, setIsEmailInvalid] = useState(true);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(true);
  const errorMessage = useSelector((state) => {
    return state.loginStatus.error;
  });
  // console.log(errorMessage);
  if (errorMessage) {
    // console.log("there is error");
  } else {
    // console.log("no error");
  }
  const [showLogin, setShowLogin] = useState("block");
  const [showSignup, setShowSignup] = useState("none");
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const loginButtonHandler = () => {
    setShowLogin("block");
    setShowSignup("none");
  };
  const signupButtonHandler = () => {
    setShowSignup("block");
    setShowLogin("none");
  };
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const obj = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    dispatch(login(obj));
  };
  const signupSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const obj = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    };
    dispatch(signup(obj));
  };
  const emailChangeHandler = (e) => {
    let emailstr = e.target.value;
    if (emailstr.includes("@")) {
      // console.log("it includes @");
      setIsEmailInvalid(false);
    } else {
      setIsEmailInvalid(true);
    }
  };
  const passwordChangeHandler = (e) => {
    let passwordStr = e.target.value;
    if (passwordStr.length > 6) {
      setIsPasswordInvalid(false);
    } else {
      setIsPasswordInvalid(true);
    }
  };
  useEffect(() => {
    if (!isEmailInvalid && !isPasswordInvalid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isEmailInvalid, isPasswordInvalid]);

  return (
    <React.Fragment>
      <header>
        <h2>Expense Tracker</h2>
        <nav>
          <button onClick={loginButtonHandler}>Login</button>
          <button onClick={signupButtonHandler}>Signup</button>
        </nav>
      </header>
      <main>
        <div className="container">
          <form className="authForm">
            <h2>
              {showLogin === "block"
                ? "Welcome Back User"
                : "New User ? Please Signup"}
            </h2>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              required
              autoComplete="on"
              ref={emailRef}
              onChange={emailChangeHandler}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              required
              autoComplete="on"
              ref={passwordRef}
              onChange={passwordChangeHandler}
            />
            {errorMessage && <h3>{errorMessage.message}</h3>}
            <button
              style={{ display: showLogin }}
              onClick={loginSubmitHandler}
              disabled={isDisabled}
            >
              Login
            </button>
            <button
              style={{ display: showSignup }}
              onClick={signupSubmitHandler}
              disabled={isDisabled}
            >
              Signup
            </button>
          </form>
        </div>
      </main>
    </React.Fragment>
  );
};

export default Auth;
