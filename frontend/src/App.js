import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CreateListingForm from "./components/CreateListing";
import SpotPage from "./components/SpotPage";
import UserPage from "./components/UserPage";
import EditListing from "./components/EditListing";
import SplashPage from "./components/SplashPage"
import AllListingsPage from "./components/AllListings";
import AddImageForm from "./components/AddImage/AddImage";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Routes>
          <Route exact={"true"} path="/" element={<SplashPage />} />

          {/* </Route> */}
          <Route exact={"true"} path="/signup" element={<SignupFormPage />} />
          {/* <SignupFormPage />
          </Route> */}
          <Route exact={"true"} path="/spots/:spotId" element={<SpotPage />} />
          {/* <SpotPage />
          </Route> */}
          <Route exact={"true"} path="/users/:userId" element={<UserPage />} />
          {/* <UserPage />
          </Route> */}
          <Route exact={"true"} path="/createListing" element={<CreateListingForm />} />
          {/* <CreateListingForm />
          </Route> */}
          <Route exact={"true"} path="/addImage" element={<AddImageForm />} />
          {/* <AddImageForm />
          </Route> */}
          <Route exact={"true"} path="/spots/:spotId/edit" element={<EditListing />} />
          {/* <EditListing />
          </Route> */}
          <Route exact={"true"} path="/allCurrentListings" element={<AllListingsPage />} />
          {/* <AllListingsPage />
          </Route> */}
          {/* <Route>
            404: Page Not Found
          </Route> */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
