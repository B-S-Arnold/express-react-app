import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateListingForm from "./components/CreateListing";
import SpotPage from "./components/SpotPage";
import UserPage from "./components/UserPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={["/", "/home"]}>
            The Splash Page / Home Page
          </Route>
          <Route path={["/signup", "/sign-up"]}>
            <SignupFormPage />
          </Route>
          <Route path={"/spot/:spotId"}>
            <SpotPage />
          </Route>
          <Route path={"/users/:userId"}>
            <UserPage />
          </Route>
          <Route path={"/createListing"}>
            <CreateListingForm />
          </Route>
          <Route>
            404: Page Not Found
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
