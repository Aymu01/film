import React from 'react'
import FavList from '../favoriteList/favList';
import { useSelector } from 'react-redux'
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { entryData } from '../../api/genreCateg';
import { ThemeContext } from '../context/context';
import './favWatch.scss'
function FavWatch() {
    const { favData, watchList } = useSelector(state => state.currentGenreOrCategory);
    const {on} = React.useContext(ThemeContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className={ on ? "favWatch-light fav-watch" : "favWatch-dark fav-watch"}>
            <div className="fav-list">
                {
                    favData.length !== 0
                    &&
                    <div>
                        <FavList data={favData} title={"Favorite List"} />
                    </div>
                }
                {
                    watchList.length !== 0
                    &&
                    <div>
                        <FavList data={watchList} title={"Watch List"} />
                    </div>
                }
                {
                    favData.length === 0 && <div>Add favorites or watchlist some movies to see them here!</div>
                }
            </div>
            <div className="logout" onClick={() => {
                dispatch(entryData(""));
                navigate("/")
            }
            }> LOGOUT  <RiLogoutBoxRLine /></div>
        </div>
    )
}

export default FavWatch;