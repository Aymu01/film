import { Tooltip, Rating, Box, CircularProgress } from '@mui/material';
import { genreLogo } from '../menu/data/data';
import { TbWorld } from 'react-icons/tb';
import { MdMovie } from 'react-icons/md';
import { IoMdFilm } from 'react-icons/io';
import { AiFillHeart,AiOutlineMinus } from 'react-icons/ai';
import { MdExposurePlus1 } from 'react-icons/md';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import './movieInfo.scss'
import { useGetMovieInfoQuery, useGetRecommadationsQuery } from '../../api/tmdbApi';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Movie from '../movie/movie';
import { selectGenreOrCategory, addFavMovie, removeFavMovie, addWatchMovie, removeWatchMovie } from '../../api/genreCateg';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeContext } from '../context/context';
import React from 'react';
import ReactPlayer from "react-player";
import { useState, useEffect } from 'react';
function Movieİnfo() {
    const { id } = useParams();
    const { data, isFetching } = useGetMovieInfoQuery({ id });
    const { data: recommadation } = useGetRecommadationsQuery(id);
    const { favData,watchList } = useSelector(state => state.currentGenreOrCategory);
    const dispatch = useDispatch();
    const İMAGE_URL = "https://image.tmdb.org/t/p/w500";
    const { on } = React.useContext(ThemeContext);
    const [click, setClick] = useState(false);
    const [favSitu, setFavSitu] = useState(false);
    const [watchSitu, setWatchSitu] = useState(false);
    const navigate = useNavigate();
    const clickEvent = () => {
        setClick(true);
    }
    const notClickEvent = () => {
        setClick(false);
    }
    useEffect(() => {
        setFavSitu(favData.find((fav => fav.id === data?.id)))
    }, [favData, data]);
    useEffect(() => {
        setWatchSitu(watchList.find((watchData => watchData.id === data?.id)))
    }, [watchList, data]);
    const favProsess = () => {
             favSitu ? dispatch(removeFavMovie(data.id)) : dispatch(addFavMovie(data));
        }
    const watchProsess = () => {
            watchSitu ? dispatch(removeWatchMovie(data.id)) : dispatch(addWatchMovie(data));
    }
    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" style={{ height: "700px" }}>
                <CircularProgress size="4rem" />
            </Box>
        );
    }
    console.log(data?.videos?.results?.length);
    return (
        <div className="all">
            {
                click
                &&
                data?.videos?.results?.length !== 0
                &&
                <div className="player-card" onClick={notClickEvent}>
                    <div className="player">
                        <div className="player">
                            <ReactPlayer url={`https://youtu.be/${data?.videos?.results[0]?.key}`} />
                        </div>
                    </div>
                </div>
            }
            <div className={on ? "light-info newBody" : "dark-info newBody"}>
                <div className='movie-info'>
                    <div className="left">
                        <div className="image">
                            <img src={İMAGE_URL + data?.poster_path} alt="" />
                        </div>
                    </div>
                    <div className="right">
                        <h3 className="title">{data?.title} ({data?.release_date.split('-')[0]})</h3>
                        <h5 className='alt-title'>{data?.tagline}</h5>
                        <div className="rat-time">
                            <div className="rating">
                                <Tooltip disableTouchListener title={data?.vote_average}>
                                    <div>
                                        <Rating readOnly value={data?.vote_average / 2} precision={0.1} className="star" />
                                    </div>
                                </Tooltip>
                                <div className="num-rating">{data?.vote_average} / 10</div>
                            </div>
                            <div className="time">
                                {data?.runtime}min / {new Date(data?.release_date).toDateString()} / {data?.spoken_languages[0].name}
                            </div>
                        </div>
                        <div className="genres">
                            {
                                data?.genres.map((genre) => (
                                    <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                                        <div className="genre-choose" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                                            <div className="genre-logo">
                                                {genreLogo.name.map((name, i) => (
                                                    name === genre.name && genreLogo.logo[i]
                                                ))}
                                            </div>
                                            <p>{genre.name}</p>
                                        </div>
                                    </Link>
                                ))
                            }

                        </div>
                        <div className="overview">
                            <h5>Overview</h5>
                            <p>{data?.overview}</p>
                        </div>
                        <div className="top-cast">
                            <h5>Top Cast</h5>
                            <div className="actors">
                                {
                                    data?.credits.cast.map((actor) => (
                                        actor.profile_path &&
                                        <Link style={{ textDecoration: 'none', color: "black" }} to={`/actors/${actor.id}`}>
                                            <div className="actor">
                                                <div className="actor-img"><img src={İMAGE_URL + actor?.profile_path} alt="" /></div>
                                                <div className="name">{actor?.name}</div>
                                                <div className="name movie-name">{actor?.character}</div>
                                            </div>
                                        </Link>
                                    )).slice(0, 6)
                                }

                            </div>
                        </div>
                        <div className="links">
                            <a className="link" href={data?.homepage !== "" && data?.homepage} target="_blank" style={{ textDecoration: 'none' }}>
                                <p className="link-name">WEBSITE</p>
                                <div className="icon-logo"><TbWorld /></div>
                            </a>
                            <a className="link" href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" style={{ textDecoration: 'none' }}>
                                <p className="link-name">IMDB</p>
                                <div className="icon-logo"><MdMovie /></div>
                            </a>
                            <div className="link" onClick={clickEvent}>
                                <p className="link-name">TRAILER</p>
                                <div className="icon-logo"><IoMdFilm /></div>
                            </div>
                            <div className="link" onClick={favProsess}>
                                <p className="link-name" >{favSitu ? "UNFAVORITE" : "FAVORITE"}</p>
                                <div className="icon-logo"><AiFillHeart /></div>
                            </div> 
                             <div className="link" onClick={watchProsess}>
                                <p className="link-name" >WATCHLIST</p>
                                <div className="icon-logo">{watchSitu ? <AiOutlineMinus /> : <MdExposurePlus1 />}</div>
                            </div>
                            <div className="link" onClick={() => navigate(-1)}>
                                <p className="link-name">BACK</p>
                                <div className="icon-logo"><HiOutlineArrowLeft /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="like">
                    <h3>You might also like</h3>
                    <div className="other-movie">
                        {
                            recommadation?.results.map((movie) => (
                                <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }} >
                                    <Movie movie={movie} key={movie.id} />
                                </Link>
                            ))
                        }
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Movieİnfo;