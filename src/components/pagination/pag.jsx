import './pag.scss'
import { useEffect } from 'react';
import React from 'react';
import { ThemeContext } from '../context/context';
function Pag({setCurrentPage,totalPages,currentPage}) {
const {on} = React.useContext(ThemeContext);
 useEffect(() => {
  setCurrentPage(currentPage);
 },[currentPage,setCurrentPage])
  return (
    <div className={on ? "light-pag pag" : "dark-pag pag"}>
        <div className="prev-next" onClick={() => setCurrentPage((prev) => prev === 1 ? prev : prev - 1)}>PREV</div>
        <div className="num">{currentPage}</div>
        <div className="prev-next" onClick={() =>setCurrentPage((prev) => prev === totalPages ? prev : prev + 1)}>NEXT</div>
    </div>
  )
}

export default Pag;
