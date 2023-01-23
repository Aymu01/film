import { BsFilm } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import { BsCompass } from 'react-icons/bs';
import { GiMailedFist } from 'react-icons/gi';
import { GrMagic } from 'react-icons/gr';
import { GiHourglass } from 'react-icons/gi';
import { GiDrippingKnife } from 'react-icons/gi';
import { BsMusicNote } from 'react-icons/bs';
import { GiDaggers } from 'react-icons/gi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGun } from '@fortawesome/free-solid-svg-icons'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import {faMasksTheater} from '@fortawesome/free-solid-svg-icons'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { faTv } from '@fortawesome/free-solid-svg-icons'
import { faSkull } from '@fortawesome/free-solid-svg-icons'
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import {faHeartPulse} from '@fortawesome/free-solid-svg-icons';
import {faHatCowboy} from '@fortawesome/free-solid-svg-icons';
export const categories = {
    logo:[<BsFilm/>,<BsStar/>,<FontAwesomeIcon icon={faClapperboard}/>],
    desc:[ "Popular","Top Rated","Upcoming"],
    value:['popular','top_rated','upcoming']
  }
export const genreLogo = {
    logo:[
    <GiMailedFist/>,
    <BsCompass/>,
    <FontAwesomeIcon icon={faPaw}/>,
    <FontAwesomeIcon icon={faMasksTheater}/>,
    <FontAwesomeIcon icon={faGun} />,
    <FontAwesomeIcon icon={faVideo}/>,
    <FontAwesomeIcon icon={faFaceFrown} />,
    <FontAwesomeIcon icon={faPeopleRoof} />,
    <GrMagic/>,<GiHourglass/>,<GiDrippingKnife/>,<BsMusicNote/>,
    <FontAwesomeIcon icon={faUserSecret}/>,
    <FontAwesomeIcon icon={faHeartPulse} />,<FontAwesomeIcon icon={faUserAstronaut}/>,
    <FontAwesomeIcon icon={faTv}/>,<FontAwesomeIcon icon={faSkull}/>,
    <GiDaggers/>,<FontAwesomeIcon icon={faHatCowboy} />
    ],
    name : [
      "Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History",
      "Horror","Music","Mystery","Romance","Science Fiction","TV Movie","Thriller","War","Western",
    ]
  }