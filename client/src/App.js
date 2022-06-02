import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import NewBrewery from "./components/NewBrewery";
import BreweryContainer from "./containers/BreweriesConatainer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/new">
            <NewBrewery user={user} />
          </Route>
          <Route path="/">
            <BreweryContainer />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
