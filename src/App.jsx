import Navbar from "./components/navbar/navbar";
import SiteBody from "./components/siteBody/siteBody";
import './App.scss'
import { ThemeContext } from "./components/context/context";
import { useState } from "react";
import Movieİnfo from "./components/movieInfo/movieInfo";
import {BsFillMicFill}  from 'react-icons/bs';
import Actor from "./components/actor/actor";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/signin";
import FavWatch from "./components/favWatch/favWatch";
function App() {  
  const [on,setOn] = useState(true);
  const [searchQuery,setSearchQuery] = useState("");
  return (
     <ThemeContext.Provider value={{on,setOn,searchQuery,setSearchQuery}}>
          <Router>
      <div className={on ? "light-app App" : "dark-app App"}>
      <div className="mic">
          <BsFillMicFill className='micIcon'/>
      </div>
      <Navbar />
      <div className={on ? "light-app main" : "dark-app main"}>
        <Routes>
          <Route path="/" element={ <SiteBody />}/>
          <Route path="/movie/:id" element={ <Movieİnfo />} />
          <Route path="/actors/:id" element={ <Actor />} />
          <Route path="/signin" element={ <SignIn /> } />
          <Route path="/signup" element={ <SignUp /> } />
          <Route path="/favWatch" element={ <FavWatch /> } />
        </Routes>    
      </div>
       </div>
       </Router>
     </ThemeContext.Provider> 
  );
}


export default App;
