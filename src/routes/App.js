import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "../containers/Register";
import Home from "../containers/Home";
import Login from "../containers/Login";
import NotFound from "../components/NotFound";
import Layout from "../components/Layout";
import SearchResults from "../components/SearchResults";
import CarouselItemDetail from "../components/CarouselItemDetail";
import axios from "axios";
import { useSelector } from "react-redux";

const App = () => {
  //FIXME Me parece que esto no anda :c
  // Config de headers de axios para todos los pedidos
  const token = useSelector(state => state.user.token)
  axios.defaults.headers.common['authorization'] = token;

  return (
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
  )
};

export default App;
