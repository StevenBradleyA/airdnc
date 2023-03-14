import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotDetails from "./components/Spots/AllSpotDetails";
import SpotDetails from "./components/Spots/SpotDetails";
import CreateSpot from "./components/Spots/CreateSpot";

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
          <Route path="/" exact>
            <AllSpotDetails />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetails />
          </Route>
          <Route path="/spots/new">
            <CreateSpot />
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
