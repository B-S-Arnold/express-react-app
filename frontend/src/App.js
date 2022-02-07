import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path={["/login", "/log-in"]}>
        <LoginFormPage />
      </Route>
      <Route path={["/signup", "/sign-up"]}>
        <SignupFormPage />
      </Route>
      <Route>
        Page Not Found
      </Route>
    </Switch>
  );
}

export default App;
