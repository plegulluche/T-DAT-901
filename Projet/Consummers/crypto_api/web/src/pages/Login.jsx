import { Link, Navigate} from 'react-router-dom';
import React, { useState, useContext  } from 'react';
import axios from 'axios';
import {useUserContext} from "../component/UserContext";

export default function Login({}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {updateUser} = useUserContext()

    const handleLogin = async (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email.error");
        const passwordError = document.querySelector(".password.error");

        await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/auth/login`,
          withCredentials: true,
          data: {
            email,
            password,
          },
        })
        .then(async (res) => {
            console.log(res);
            if (res.data.errors) {
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            } else {
              await updateUser('connected')
              return window.location = "/profile";
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const navAnonymous = async () => {
        await updateUser('anonymous')
        window.location = "/cryptos"
      }

    return (
        <div className="min-h-screen w-full flex lg:flex-row flex-col z-30 bg-[#252525]">
            <img src="../auth.png" className='w-0 h-0 lg:min-h-screen lg:w-full lg:absolute lg:rotate-0 rotate-90' />
            <div className='lg:min-h-screen w-full z-20 flex items-center lg:pl-[100px] lg:justify-start justify-center'>
                <img src="../illu.png" className='xl:w-[450px] xl:h-[450px] lg:w-[350px] lg:h-[350px] w-[250px] h-[250px] lg:mt-0 mt-10' />

            </div>
            <div className='lg:min-h-screen w-full z-20 flex items-center lg:justify-start justify-center'>
                <div className='w-[70%] h-[70%] flex flex-col items-center mt-[40px]'>
                <img src="../logo2.png" className='w-[170px] h-[110px]' />
                <p className='text-[55px] text-gray-400 font-bold'>Hello !</p>
                <div className='flex flex-col gap-[15px] mt-[30px] items-center'>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className='w-[350px] h-[43px] flex flex-col text-[15px] text-gray-600 p-[5px] border-2 rounded-md border-gray-400 bg-gray-200' placeholder='Email'></input>
                <div className="email error"></div>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-[350px] h-[43px] flex flex-col text-[15px] text-gray-600 p-[5px] border-2 rounded-md border-gray-400 bg-gray-200' placeholder='Password'></input>
                <div className="password error"></div>
                <div className='flex gap-1'>
                    <p className='text-[15px] text-gray-400 font-bold'>Don't have an account ?</p>
                    <Link to="/auth/register">
                        <p className='text-[15px] text-orange-400 font-bold hover:cursor-pointer'>Create one now !</p>
                    </Link>
                </div>
                <div to="/cryptos" onClick={() => navAnonymous()}>
                    <p className='text-[15px] text-gray-500 underline hover:cursor-pointer'>Continue as anonymous user</p>
                </div>
                <div className='w-full bg-[#b88334] h-[45px] rounded-md mt-[20px] flex items-center justify-center hover:cursor-pointer hover:bg-[#DC962E]'>
                    <button onClick={handleLogin} className='text-gray-300 font-bold text-[18px]'>Login</button>
                </div>
            </div>
            </div>
        </div>
     </div>
    )
}