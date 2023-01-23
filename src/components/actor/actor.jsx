import React from 'react'
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useGetActorInfoQuery, useGetByIdActorMoviesQuery } from '../../api/tmdbApi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import Pag from '../pagination/pag';
import Movie from '../movie/movie';
import './actor.scss'
import { ThemeContext } from '../context/context';
function Actor() {
  const { id } = useParams()
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching, error } = useGetActorInfoQuery(id);
  const { data: actor } = useGetByIdActorMoviesQuery({ id, currentPage });
  const { on } = React.useContext(ThemeContext);
  const İMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const navigate = useNavigate();
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" style={{ height: "700px" }}>
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  console.log(isFetching);
  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please searh for something else.
        </Typography>
      </Box>
    );
  }
  if (error) return 'An error has occured.';
  return (
    <div className={on ? "light-actor actor-cart" : "dark-actor actor-cart"}>
      <div className="actor-info">
        <div className="image">
          <img src={İMAGE_URL + data?.profile_path} alt="" />
        </div>
        <div className="right-info">
          <div className="actor-bio">
            <h3 className="name">{data?.name}</h3>
            <h5 className='born'>Born: {new Date(data?.birthday).toDateString()}</h5>
            <p>{data?.biography}</p>
          </div>
          <div className="button">
            <a className="imdb" href={`https://www.imdb.com/name/${data?.imdb_id}`} target="_blank" style={{ textDecoration: 'none' }}>IMDB</a>
            <button className="back" onClick={() => navigate(-1)}><HiOutlineArrowLeft />BACK</button>
          </div>
        </div>
      </div>
      <div className="actor-film">
        <h3>Movies</h3>
        <div className="movies">
          {
            actor?.results.slice(0, 12).map((movie, i) => (
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }} >
                <Movie movie={movie} key={i} />
              </Link>
            ))
          }
          <div>
          </div>
        </div>
        <Pag setCurrentPage={setCurrentPage} totalPages={actor?.total_pages} />
      </div>
    </div>
  )
}

export default Actor;
