import { ThemeContext } from '../context/context';
import {Tooltip, Rating } from '@mui/material';
import React from 'react';
import './movie.scss'
 function Movie({movie}) {
 const {on} = React.useContext(ThemeContext);
 const İMAGE_URL = "https://image.tmdb.org/t/p/w500";
 const no_photo = "https://media.istockphoto.com/photos/popcorn-and-clapperboard-picture-id1191001701?k=20&m=1191001701&s=612x612&w=0&h=uDszifNzvgeY5QrPwWvocFOUCw8ugViuw-U8LCJ1wu8="
  return (
    <div className={on ? "light-movie movie-cart" : "dark-movie movie-cart"}>
      <div className="image">
       <img src={movie.poster_path ? İMAGE_URL + movie.poster_path : no_photo} alt="" />
      </div>
      <div className="name">
        <h5>{movie.title}</h5>
      </div>
      <div className="stars">
      <Tooltip disableTouchListener title={movie.vote_average}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} className="star"/>
            </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default Movie;
