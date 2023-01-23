import "./signup.scss"
import {AiFillEye} from 'react-icons/ai'
import { useContext, useState } from 'react';
import { ThemeContext } from '../context/context';
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import { entryData } from '../../api/genreCateg';
import { useDispatch } from "react-redux";

function SignUp() {
 const [passwordType,setPasswordType] = useState("password");
 const passwordToggle = () => {
   if(passwordType === "password"){
    setPasswordType("text")
    return;
   }
   setPasswordType("password")
  
 }
 const {on} = useContext(ThemeContext);
 const { register, handleSubmit, formState: { errors } } = useForm();
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [upErr,setUpErr] = useState(false);
 const [messageUp,setMessageUp] = useState("");
 const onSubmit = async (data) => {
  await axios.post('https://minecard.az/api/moonsun/register',data).then(
    res => {
        console.log("Result: " + JSON.stringify(res));
      setUpErr(true);
      setMessageUp("Email address already in use");
      setTimeout(()=>{
        setUpErr(false)
       },3000);
       dispatch(entryData(data.fullname));
       navigate("/");
    }
).catch(
    err => {
        console.log("Errorrr: " + err);
        setUpErr(false);
    }

)
}
  return (  
    <div className={on ? "light-signUp signup-area" : "dark-signUp signup-area"}>
      <div className="sign-up">
      <h2>Sign Up</h2>
      {
          upErr && <div className="notUp">{messageUp}</div>
      }
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
         <div className="up-valid">
        <input type="text" name="fullName" className="up-info" placeholder="Full Name"  {...register("fullname", {
              required: {
                value:true,
                message:"Full name is required"
              } 
            })}/>
        <ErrorMessage errors={errors} name="fullname" className='error-span' as="p"/>
        </div>
        <div className="up-valid">
        <input type="email" name="email" className="up-info" placeholder="Email"  {...register("email", {
              required: {
                value:true,
                message:"Email is required"
              } 
            })}/>
        <ErrorMessage name="email" errors={errors} className='error-span' as="p"/>
        </div> 
         <div className="up-valid">
        <input type={passwordType} name="password" className="up-info" placeholder="Password"  {...register("password", {
              required: {
                value:true,
                message:"Password is required"
              },
              minLength: {
                value: 8,
                message: "En azı 8 karakter girilmelidir"
              },
              maxLength: {
                value: 60,
                message: "60 karakterten çok girilemez"
              }
            })}/>
        <AiFillEye className='show' onClick={passwordToggle}/>
        <ErrorMessage name="password" errors={errors} className='error-span' as="p"/>
        </div>
        <div className="up-valid">
        <input type="text" name="phone" className="up-info" placeholder="Phone"  {...register("phone", {
              required: {
                value:true,
                message:"Phone is required"
              } 
            })}/>
        <ErrorMessage errors={errors} name="phone" className='error-span' as="p"/>
        </div>
        <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}


export default SignUp

