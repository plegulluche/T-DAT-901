import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Articles from '../pages/Articles';

// Define a type for the article structure
type Article = {
  link: string;
  image: string;
  name: string;
  desc: string;
};

type JsondataProps = {
  keywords: string[];
};

export default function Jsondata() {
  // Specify the type of state as an array of Article
  const [recentBlogPost, setRecentBlogPost] = useState<Article[]>([]);

  // Simulating user keywords with hardcoded data
  const keywords = ['crypto', 'bitcoin', 'ethereum', 'dogecoin'];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = '89c42f05c2b141909fc8839c81b33197'; // Replace with your News API key
        const query = keywords.map((elem, idx) => idx === keywords.length - 1 ? elem : `${elem} OR `).join('');
        const response = await axios.get(`https://newsapi.org/v2/everything?q=(${query})&sortBy=popularity&apiKey=${apiKey}`);
        const articles: Article[] = response.data.articles.map(({ url, urlToImage, title, description }: any) => ({ link: url, image: urlToImage, name: title, desc: description }));
        setRecentBlogPost(articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [keywords]);

  return (
    <div className='mx-auto pl-28 pr-12 w-full'>
      <Articles data={recentBlogPost} />
    </div>
  );
}
