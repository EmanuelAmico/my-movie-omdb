import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import '../assets/styles/components/Search.scss'
import { getMovies } from "../redux/movies";

const Search = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = e => {
    const title = e.target.value
    if(e.keyCode === 13) {
      dispatch(getMovies(title))
      history.push(`/movies?title=${title}`)
    }
  }

  return (
    <section className="main">
      <h2 className="main__title">¿Qué quieres ver hoy?</h2>
      <input type="text" className="input" placeholder="Buscar..." onKeyUp={handleChange}/>
    </section>
  );
};

export default Search;