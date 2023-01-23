import { Link, useNavigate} from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai'
import './signin.scss'
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/context';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { useDispatch} from 'react-redux';
import { entryData } from '../../api/genreCateg';
function SignIn() {
  const [passwordType, setPasswordType] = useState("password");
  const [message,setMessage] = useState("");
  const [err,setErr] = useState(false)
  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")

  }
  const {on} = useContext(ThemeContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
  await axios.post('https://minecard.az/api/moonsun/login',data
  ).then(
      res => {
          localStorage.setItem('token',res?.data?.data?.token)
          getUserData();
      }
  ).catch(
      err => {
          console.log("Erorororor: " + err);
          setMessage("Incorrect username or password");
          setErr(true);
      }
  )
}
 setTimeout(()=>{
  setErr(false)
 },5000);
  async function getUserData() {
    try {
      const response = await axios.get("https://minecard.az/api/moonsun/user",{
        headers: {
          Authorization:'Bearer ' + localStorage.getItem('token')
        }
      });
      dispatch(entryData(response?.data?.data?.user?.fullname));
      navigate("/");
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={on ? "light-signIn sign-area" : "dark-signIn sign-area"}>
      <div className='sign_in'>
        <h2>Sign In</h2>
        {
          err && <div className="notLogin">{message}</div>
        }
        <form className='form' onSubmit={handleSubmit(onSubmit)} >
          <div className='validation'>
            <input name="email" type="email" placeholder="Email" className="info" {...register("email", {
              required: {
                value:true,
                message:"Email is required"
              } 
            })} />
            <ErrorMessage errors={errors} name="email" as="p" className='error-span'/>

          </div>
          <div className='validation'>
            <input name="password" type={passwordType} placeholder="Password" className="info" {...register("password", {
              required: {
                value: true,
                message: "Password is required"
              },
              minLength: {
                value: 6,
                message: "En azı 6 karakter girilmelidir"
              },
              maxLength: {
                value: 60,
                message: "60 karakterten çok girilemez"
              }
            })} />
            <AiFillEye className='show' onClick={passwordToggle} />
            <ErrorMessage errors={errors} name="password" as="p" className='error-span' />
          </div>
          <button >Sign In</button>
          <div className="check-need">
            <label>
              <input type="checkbox" name="accept" {...register("Accept", {
                required: {
                  value: true,
                  message: "Accept"
                }
              })} />
              <div className="check" ></div>
              Remember me
            </label>
            <Link style={{ textDecoration: 'none' }} className="need">Need help?</Link>
          </div>
        </form>  
        <div className="signup">
          New to Filmpire? <Link to="/signup" style={{ textDecoration: 'none' }} className="sign-link">Sign Up now</Link>
        </div>

      </div>
    </div>
  )

 
}
export default SignIn;

