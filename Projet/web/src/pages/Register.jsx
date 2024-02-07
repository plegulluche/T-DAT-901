import React, { useState, useContext } from "react";
import { Link} from 'react-router-dom';
import axios from "axios";
import { UidContext } from "../component/AppContext";

export default function Register({}){
    
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const uid = useContext(UidContext);

//if (uid) window.location = "/profile";

const handleRegister = async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".username.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/auth/register`,
        data: {
            username,
            email,
            password,
        }
    }).then((res) => {
        console.log(res);
        if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
        } else {
            window.location = "/login";
        }
    }).catch((err) => console.log(err));
}


return (
<div className="min-h-screen w-full flex flex-row z-30">
            <img src="../auth.png" className='absolute' />

            <div className='min-h-screen w-full z-20 flex items-center pl-[100px]'>
                <img src="../illu.png" className='w-[450px] h-[450px]' />
            </div>
        <div className='min-h-screen w-full z-20 flex items-center justify-start'>
            <div className='w-[70%] h-[70%] flex flex-col items-center mt-[40px]'>
            <img src="../logo2.png" className='w-[170px] h-[110px]' />
             <p className='text-[55px] text-gray-400 font-bold'>Welcome !</p>
            <div className='flex flex-col gap-[15px] mt-[30px] items-center'>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className='w-[350px] h-[43px] flex flex-col text-[15px] text-gray-600 p-[5px] border-2 rounded-md border-gray-400 bg-gray-200' placeholder='Email'></input>
                <div className="email error"></div>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='w-[350px] h-[43px] flex flex-col text-[15px] text-gray-600 p-[5px] border-2 rounded-md border-gray-400 bg-gray-200' placeholder='Username'></input>
                <div className="username error"></div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-[350px] h-[43px] flex flex-col text-[15px] text-gray-600 p-[5px] border-2 rounded-md border-gray-400 bg-gray-200' placeholder='Password'></input>
                
                <div className="password error"></div>
                <div className='flex gap-1'>
                    <p className='text-[15px] text-gray-400 font-bold'>Already have an account ?</p>
                    <Link to="/auth/login">
                        <p className='text-[15px] text-orange-400 font-bold hover:cursor-pointer'>Login now !</p>
                    </Link>
                </div>
                <div className='w-full bg-[#b88334] h-[45px] rounded-md mt-[20px] flex items-center justify-center hover:cursor-pointer hover:bg-[#DC962E]'>
                
                  
                    <p className='text-gray-300 font-bold text-[18px]' onClick={handleRegister}>Register</p>

                </div>
            </div>
        </div>
      </div>
    </div>







)

}