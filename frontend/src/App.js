import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotDetails from "./components/Spots/AllSpotDetails";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpot from "./components/Spots/CreateSpot";
import ManageSpots from "./components/Spots/ManageSpots";
import UpdateSpot from "./components/Spots/UpdateSpot";
import ManageBookings from "./components/Spots/Bookings/ManageBookings";

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
          <Route path="/spots/:spotId/edit" exact>
            <UpdateSpot />
          </Route>
          <Route path="/bookings/current" exact>
            <ManageBookings />
          </Route>
           <Route path="/spots/current" exact>
            <ManageSpots />
          </Route>
          <Route path="/spots/new" exact>
            <CreateSpot />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route path="/" exact>
            <AllSpotDetails />
          </Route>
          <Route>
            <p>Page Not Found ¯\_(ツ)_/¯ </p>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
