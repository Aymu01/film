import './siteBody.scss'
import React, { useState } from 'react';
import { ThemeContext } from '../context/context';
import Movie from '../movie/movie';
import Pag from '../pagination/pag';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../api/tmdbApi';
import { Link } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';


function SiteBody() {
  const { on,searchQuery } = React.useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const { data , isFetching , error } = useGetMoviesQuery({ genreIdOrCategoryName, currentPage, searchQuery })
  const İMAGE_URL = "https://image.tmdb.org/t/p/original";
 console.log(data);
 if (isFetching) {
  return (
    <Box display="flex" justifyContent="center" style={{height:"700px"}}>
      <CircularProgress size="4rem" />
    </Box>
  );
}
if (!data?.results?.length) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="20px" >
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
    <div className={on ? 'site-body light-site' : 'site-body dark-site'}>
      <div>
        <Link to={`/movie/${data?.results[0].id}`} style={{ textDecoration: 'none' }} >
        <div className="movie" style={{ backgroundImage: `url("${İMAGE_URL + data?.results[0].backdrop_path}")` }}>
          <div className="movie-info">
            <div className="movie-name">
              <p>{data?.results[0].title}</p>
            </div>
            <div className="movie-overview">
              <p>
                {data?.results[0].overview}
              </p>
            </div>
          </div>
        </div>
        </Link>
        <div className="movie-list">
          {
            data?.results?.map((movie, index) => (
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }} >
                <Movie key={index} movie={movie} />
              </Link>
            ))
          }
        </div>
        <Pag setCurrentPage={setCurrentPage} totalPages={data?.total_pages} currentPage={currentPage}/>
      </div>
    </div>

  )
}

export default SiteBody;


