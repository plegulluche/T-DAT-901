import React from "react";

export default function Homepage() {
    return (
      <div className="min-h-screen w-full flex flex-row z-30 ">
        <img src="./auth.png" className='absolute' />
        <div className='min-h-screen w-full z-20 flex items-center pl-[100px]'>
          <img src="./illu.png" className='w-[450px] h-[450px]' />
        </div>
        <div className='min-h-screen w-full z-20 flex items-center justify-start'>
          <div className='w-[70%] h-[70%] flex flex-col items-center mt-[40px]'>
            <img src="./logo2.png" className='w-[170px] h-[110px]' />
            <p className='text-[55px] text-gray-400 font-bold'>Hello !</p>
            <div className='flex flex-col gap-[15px] mt-[30px] items-center'>
              <input type="text" className='w-[350px] h-[43px] flex flex-col text-[15px] text-gray-600 p-[5px] border-2 rounded-md border-gray-400 bg-gray-200' placeholder='Email'></input>
              <input type="text" className='w-[350px] h-[43px] flex flex-col text-[15px] text-gray-600 p-[5px] border-2 rounded-md border-gray-400 bg-gray-200' placeholder='Password'></input>
              <div className='flex gap-1'>
                <p className='text-[15px] text-gray-400 font-bold'>Don't have an account ?</p>
                <p className='text-[15px] text-orange-400 font-bold hover:cursor-pointer'>Create one now !</p>
              </div>
              <div className='w-full bg-[#b88334] h-[45px] rounded-md mt-[20px] flex items-center justify-center hover:cursor-pointer hover:bg-[#DC962E]'>
                <p className='text-gray-300 font-bold text-[18px]'>Login</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }