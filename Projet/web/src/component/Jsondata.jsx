import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import { useSelector } from "react-redux";
import requests from '../api/Requests';
import axios from 'axios';
import { useUserContext } from './UserContext';

export default function Jsondata() {
  const [recentBlogPost, setRecentBlogPost] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const [keywords, setKeywords] = useState(null)
  const {getUser} = useUserContext()

  useEffect(() => {
    if (user && getUser() === 'connected') {
      const request = requests.GetUserKeywordsByUserId
      .replace('{id}', user._id)
      axios.get(request)
      .then((response) => {
        console.log(response.data.length)
        if (!response.data.length) setKeywords(['crypto'])
        else setKeywords(response.data.map(elem => elem.keyword))
        })
        .catch((error) => {
            console.log(error);
        })
    }
    else {
      setKeywords(['crypto'])
    }
  }, [user])


  async function FetchDataFromRssFeed() {
      var request = new XMLHttpRequest();
      request.onreadystatechange = async () => {
        if (request.readyState == 4 && request.status == 200) {
          var myObj = await JSON.parse(request.responseText);
          const tmp = myObj.articles.map(elem => ({ link: elem.url, image: elem.urlToImage, name: elem.title, desc: elem.description }))
          setRecentBlogPost(tmp)
        }
      }
      request.open("GET", `https://newsapi.org/v2/everything?q=(${keywords.map(elem => (keywords.findIndex(el => el === elem) === (keywords.length - 1)) ? elem : elem + " OR ").join('')})&sortBy=popularity&apiKey=89c42f05c2b141909fc8839c81b33197`, true);
      request.send()
  }

  useEffect(() => {
    if (keywords)
      FetchDataFromRssFeed();
  }, [keywords]);

  return (
    <div className='pl-32 pr-12' >
        <Hero data={recentBlogPost} />
    </div>
  )
}