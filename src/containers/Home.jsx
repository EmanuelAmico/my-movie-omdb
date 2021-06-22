import React from "react";
import Search from "../components/Search";
import { useSelector } from "react-redux";
import "../assets/styles/App.scss";

const Home = () => {

  const myList = []

  return (
    <>
      <Search />

      {/* {myList.lenght && 
      <Categories title="DEME MI Listaaaaaaa">
        <Carousel>
          {myList.map( movie => <CarouselItem key={movie.imdbID} {...movie} isMyList={true}/>)}
        </Carousel>
      </Categories>} */}

    </>
  );
};

export default Home