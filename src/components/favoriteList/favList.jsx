import React from 'react'
import Movie from '../movie/movie';
import { Link } from 'react-router-dom';
import './favList.scss'
import { ThemeContext } from '../context/context';
function FavList({data,title}) {
    const {on} = React.useContext(ThemeContext);
  return (
          <div className={ on ? "fav fav-light" : "fav fav-dark"}>
              <h2>{title}</h2>
              <div className="movie-list">
            {data.map((movie, index) => (
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }} >
                <Movie key={index} movie={movie} />
              </Link>
            ))
            }
            </div>
            </div>
  )
}

export default FavList

