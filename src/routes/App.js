import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../containers/Register";
import Home from "../containers/Home";
import Login from "../containers/Login";
import NotFound from "../components/NotFound";
import Layout from "../components/Layout";
import SearchResults from "../components/SearchResults";
import CarouselItemDetail from "../components/CarouselItemDetail";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/movies/:imdbID" component={CarouselItemDetail} />
        <Route exact path="/movies" component={SearchResults} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default App;
