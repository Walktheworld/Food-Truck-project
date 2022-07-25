import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewPage from "./components/NewPage";
import Home from "./components/Home";
import ReviewsList from "./components/ReviewsList";
import ReviewCard from "./components/ReviewCard";
import Profile from "./components/Profile";
import PagesConatainer from "./containers/PagesConatainer";
import PageCard from "./components/PageCard";
import PostCard from "./components/PostCard";
import PostList from "./components/PostList";
import { UserContext } from "./context/user";
import Subscribe from "./components/Subscribe";


function App() {
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [setUser]);

  if (!user) return <Login />;

  return (
    <>
      <NavBar />
      <main>
        <Switch>
        <Route exact path="/"><Home/></Route>
          <Route path="/new">
            <NewPage />
          </Route>          
          <Route path="/pages/:pageId/reviews">
            <ReviewsList/>
          </Route>
          <Route path="/pages/:pageId/posts">
            <PostList/>
          </Route>
          <Route path="/pages/:pageId">
            <PageCard/>
          </Route>
          <Route path="/reviews/:reviewId">
            <ReviewCard/>
          </Route>
          <Route path="/posts/:postId">
            <PostCard/>
          </Route>
          <Route path="/pages">
            <PagesConatainer/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/subscribe">
            <Subscribe/>
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
