import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewPage from "./components/NewPage";
import Home from "./components/Home";
import ReviewsList from "./components/ReviewsList";
import ReviewCard from "./components/ReviewCard";
import BreweryCard from "./components/BreweryCard";
import Profile from "./components/Profile";
import PagesConatainer from "./containers/PagesConatainer";

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
        <Route exact path="/"><Home/></Route>
          <Route path="/new">
            <NewPage user={user} />
          </Route>          
          <Route path="/pages/:id/reviews">
            <ReviewsList user={user}/>
          </Route>
          <Route path="/pages/:id">
            <BreweryCard user={user}/>
          </Route>
          <Route path="/reviews/:id">
            <ReviewCard user={user}/>
          </Route>
          <Route path="/pages">
            <PagesConatainer user={user}/>
          </Route>
          <Route path="/profile">
            <Profile user={user}/>
          </Route>

        </Switch>
      </main>
    </>
  );
}

export default App;
