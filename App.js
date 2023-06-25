import React, { useEffect } from "react";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { useSelector } from "react-redux";
import { initialLoading, getExpenses } from "./redux/ExpenseSlice";
import { useDispatch } from "react-redux";
import { ContextProvider } from "./components/Context";
function App() {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => {
    return state.loginStatus.status;
  });
  // if (currentState) {
  //   dispatch(getExpenses());
  // }
  useSelector((state) => {
    console.log(state);
  });

  const loginStatus = localStorage.getItem("login");
  useEffect(() => {
    if (loginStatus) {
      // console.log("login true");
      // console.log(localStorage.getItem("token"));
      dispatch(initialLoading());
      dispatch(getExpenses());
    } else {
      // console.log("login false");
    }
  }, [dispatch, loginStatus]);
  return (
    <React.Fragment>
      <ContextProvider>
        {!currentState && <Auth />}
        {currentState && <Profile />}
      </ContextProvider>
    </React.Fragment>
  );
}
export default App;
