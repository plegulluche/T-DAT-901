import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import { useSelector } from "react-redux";
import requests from '../api/Requests';
import axios from 'axios';
import { useUserContext } from './UserContext';

export default function Jsondata() {
  const [recentBlogPost, setRecentBlogPost] = useState([]);
  const user = useSelector((state) => state.userReducer);
  const search = useSelector((state) => state.searchReducer); // Get the search term from the reducer
  const [keywords, setKeywords] = useState(null);
  const {getUser} = useUserContext();
  
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
    // Determine the query based on the presence of a search term
    const query = search.searchTerm
      ? `${search.searchTerm}`
      : keywords && keywords.length
        ? `${keywords.join(" OR ")}`
        : '';
  
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: query + " cryptocurrency",
          sortBy: 'popularity',
          apiKey: process.env.REACT_APP_API_KEY, // Use an environment variable for your API key
        }
      });
      const articles = response.data.articles.map(article => ({
        link: article.url,
        image: article.urlToImage,
        name: article.title,
        desc: article.description
      }));
      setRecentBlogPost(articles);
    } catch (error) {
      console.error("Error fetching news articles:", error);
    }
  }
  
  

  useEffect(() => {
    if (keywords) {
      FetchDataFromRssFeed();
    }
  }, [keywords, search.searchTerm]);

  return (
    <div className='pl-32 pr-12' >
        <Hero data={recentBlogPost} />
    </div>
  )
}