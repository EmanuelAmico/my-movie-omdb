import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import UserCard from '../components/UserCard'

const UserDetails = () => {
  const match = useRouteMatch()
  const loggedUser = useSelector (state => state.user)
  let favoriteMovies
  if(match.url === '/users/me'){
    favoriteMovies = useSelector(state => state.favoriteMovies)
  } else {
    const users = useSelector(state => state.users)
    const user = users.filter(user => user.id === Number(match.params.userId))[0]
    favoriteMovies = user.favoriteMovies
  }
  

  return (
    <>
      <Carousel user={user} >
        {favoriteMovies.map(movie => <CarouselItem key={movie.imdbID} isUserList={user.name === loggedUser.name } {...movie}/>)}
      </Carousel>
    </>
  )
}

export default UserDetails
