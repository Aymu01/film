import { MdMenu } from 'react-icons/md';
import '../navbar/navbar.scss';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import Menu from '../menu/menu';
import { useState } from 'react';
import { ThemeContext } from '../context/context';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { entryData } from '../../api/genreCateg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const {on, setOn, setSearchQuery} = React.useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const {entry} = useSelector(state => state.currentGenreOrCategory);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sideOpen = () => {
        setOpen(true)
    }
    const sideClose = () => {
        setOpen(false)
    }
    const lightDark = () => {
        setOn(!on)
    }
    const searchKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearchQuery(search);
        }
    }
    return (
        <div className='app'>
            <header>
                <nav>
                    <div className={on ? 'light-nav nav-bar' : 'dark-nav nav-bar'}>
                        <div className="comp-mob">
                        <div className='open-menu'>
                            <MdMenu className="menu-logo" sx={{ fontSize: 50 }} onClick={sideOpen} />
                        </div>
                        <div className='darkLight'>
                                <div className="site-logo" onClick={lightDark}>
                                    <div className="site-logo-light" >
                                        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="Brightness4Icon">
                                            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z">
                                            </path>
                                        </svg>
                                    </div>
                                    <div className="site-logo-dark">
                                        <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="Brightness7Icon">
                                            <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                        </div>
                        <div className="search-comp">
                            <form >
                                <AiOutlineSearch className='logo' />
                                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchKey} />
                            </form>
                        </div>
                        {
                            entry === ""
                                ?
                                <Link className="login" to='/signin' style={{ textDecoration: 'none', color: "#fff" }}>
                                    <div className="but-menu">
                                        <div className="button">
                                            <div >SIGN IN</div>
                                            <BiUserCircle className='log' />
                                        </div>
                                    </div>
                                </Link>
                                :
                                <Link className="login ok" style={{ textDecoration: 'none', color: "#fff" }}>
                                    <div className="but-menu">
                                        <div className="button">
                                            <BiUserCircle className='log' />
                                            <div >{entry}</div>
                                        </div>
                                        <ul className="sign-menu">
                                            <li><Link className='list-menu' to="/favWatch">My account</Link></li>
                                            <li><Link className='list-menu' to="/"
                                                onClick={() => {
                                                    dispatch(entryData(""));
                                                    navigate("/")
                                                }
                                                }
                                            >Log out</Link></li>
                                        </ul>
                                    </div>
                                </Link>
                        }
                        </div>
                        <div className="search">
                            <form>
                                <div className="search-logo">
                                    <AiOutlineSearch className='logo' />
                                </div>
                                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} onKeyPress={searchKey} />
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
            <div className={open ? 'menu-cards active' : 'menu-cards'} onClick={sideClose}>
                <Menu />
            </div>
        </div>
    )
}

export default Navbar;