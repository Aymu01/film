import { categories , genreLogo} from './data/data';
import logo from'./image/logo.png';
import './menu.scss';
import { ThemeContext } from '../context/context';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectGenreOrCategory } from '../../api/genreCateg';
import { useGetGenreQuery } from '../../api/tmdbApi';
import { Link } from 'react-router-dom';
function Menu() {
 const {on} = React.useContext(ThemeContext);
 const dispatch = useDispatch();
 const {data} = useGetGenreQuery();

  return (
    <div className={on ? 'menu-cart light-menu' : 'menu-cart dark-menu'}>
      <Link to="/">
      <div className="header">
      <img src={logo} alt="" />
      </div>
      </Link>
      <div className="menu">
      <div className="categories ">
        <div className="title">Categories</div>
        <ul>
          {
            categories.logo.map((logo,i)=> (
              <Link to="/" key={i} style={{textDecoration: 'none',color: "black"}}>
              <li key={i} >
                <div className="alt-categ" onClick={ () => dispatch(selectGenreOrCategory(categories.value[i]))}>
                  <div className="menu-logo">
                  {logo}
                  </div>
                <p>{categories.desc[i]}</p>
               </div>
               </li>
               </Link>
            ))
        }
        </ul>
      <hr />
      </div>
      <div className="categories">
      <div className="title">Genres</div>
      <ul>
        {
          data?.genres?.map((genre,index) => (
            <Link to="/"  style={{textDecoration: 'none',color: "black"}} key={index}>
            <li key={index}>
            <div className="alt-categ" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <div className="menu-logo">
              {genreLogo.logo[index]}
              </div>
            <p>{genre.name}</p>
           </div>
           </li>
           </Link>
          ))
        }
      </ul>
      </div>
      </div>
    </div>
  )
}

export default Menu;
