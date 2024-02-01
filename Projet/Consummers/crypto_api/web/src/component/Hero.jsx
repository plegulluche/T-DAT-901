import React from 'react'
import { useSelector } from 'react-redux'
import requests from '../api/Requests'
import { useState, useEffect } from 'react'
import axios from 'axios'

function MainArticle({content}) {
  return (
      <div className='bg-[#3A3A3A] w-[840px] p-5 rounded-lg mb-5' >
          <div className='w-full'>
              <img src={content.image} alt="hero" className="h-fit w-full rounded-xl" />
          </div>
          <div className='py-10 flex gap-5'>
              <p className='text-[#ffbe0b] text-4xl cursor-pointer hover:text-amber-500 ml-5'>{content.name}</p>
              <div>
                  <p className='text-[#FFFFFF]'>{content.desc} </p>
                  <a href={content.link} target="_blank" rel="noreferrer">
                    <button className="shadow-lg h-fit mt-10 bg-[#686868] text-gray-100 hover:opacity-80 font-bold px-10 py-3 rounded-lg">Read more</button>
                  </a>
              </div>      
          </div>
          <hr className='my-5' />
      </div>
  )
}

function BasicArticle({content}) {
  return (
    <div>
        <a href={content.link} target="_blank" rel="noreferrer">
            <h4 className='text-2xl font-black text-[#ffbe0b] mb-5  cursor-pointer hover:text-amber-500'>{content.name}</h4>
        </a>
        <p className='text-[#FFFFFF] opacity-60 mt-3'>{content.desc}</p>
        <hr className='my-5' />
    </div>
  )
}

const Hero = (props) => {
  const [count, setCount] = useState(undefined)
  const userData = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (userData._id) {
            const request = requests.GetConfigCount
            .replace('{id}', userData._id)
            axios.get(request)
            .then((response) => {
                setCount(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else setCount(10)
    }, [userData])

  if (!count) return <div>loading</div>
  return (
    <div className='my-10 gap-10 flex flex-col sm:flex-row bg-[#252525]'>
      <div>
        {props.data.slice(0, count / 2).map(content => <MainArticle content={content} />)}
      </div>
      <div className='bg-[#3A3A3A] rounded-lg p-10'>
        {props.data.slice(0, count / 2).map(content => <BasicArticle content={content}/>)}
      </div>
    </div>
  )
}

export default Hero