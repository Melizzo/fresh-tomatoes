import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { Link } from 'react-router-dom'
import './MovieContainer.css';

const MovieContainer = ({ appState, getUsersRatings, getAllFavorites, favorites }) => {
  let movieCards;
  const user = appState.usersFavorites.find(user => user.user_id === appState.userID)
  if(!favorites) {
    movieCards = appState.movies.map((movie, i) => {
      return (
        <MovieCard
          userID={appState.userID}
          title={movie.title}
          averageRating={movie.average_rating}
          poster={movie.poster_path}
          id={movie.id}
          userRatings={appState.userRatings}
          key={i}
          getUsersRatings={getUsersRatings}
          usersFavorites={appState.usersFavorites}
          getAllFavorites={getAllFavorites}
        />
      );
    });
  } else {
    movieCards = appState.movies.map((movie, i) => {
      if(user.movie_ids.includes(movie.id)) {
        return (
          <MovieCard
            userID={appState.userID}
            title={movie.title}
            averageRating={movie.average_rating}
            poster={movie.poster_path}
            id={movie.id}
            userRatings={appState.userRatings}
            key={i}
            getUsersRatings={getUsersRatings}
            usersFavorites={appState.usersFavorites}
            getAllFavorites={getAllFavorites}
          />
          );
      } else {
        return null;
      }
    });
  }
  
  if(movieCards.every(card => card === null)) {
    movieCards = (
    <div className="no-favorites-container">
    <Link to={`/`}><button className='back-btn'>◀ BACK</button></Link>
    <p>You currently have no favorites</p>
    </ div>
    )
  }
  return <div className="movie-container">{movieCards}</div>;
};

export default MovieContainer;