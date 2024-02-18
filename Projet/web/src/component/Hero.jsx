import React from 'react';
import { useEffect } from 'react';
import Carousel from './Carousel';
import ChildCarousel from './ChildCarousel';


const Hero = ({ data }) => {
  useEffect(() => {
    // Data manipulation logic here if necessary
  }, []); 

  const carouselSlides = data.slice(0, 4).map(newsItem => ({
    image: newsItem.image,
    title: newsItem.name,
    description: newsItem.desc,
    link: newsItem.link,
    alt: newsItem.title,
  }));

  const groupedArticles = [];
  for (let i = 0; i < data.length; i += 2) {
    groupedArticles.push(data.slice(i, i + 2));
  }

  console.log(groupedArticles);

  if (!data.length) return <div>Loading...</div>;

  return (
    <div className='my-2 h-screen'>
      {/* <h2 className='text-4xl font-bold text-gray-100 mb-5'>Trending Now</h2> */}
      <div className='w-full flex flex-col sm:flex-row h-screen justify-between'>
      <div className=' mx-auto sm:mx-0 flex justify-center w-[100%] sm:w-[45%] h-screen'>
        <Carousel slides={carouselSlides} />
      </div>
      <div className='w-full sm:w-[50%]'>
          <ChildCarousel slides={groupedArticles} />
        </div>
      </div>
    </div>
  );
}

export default Hero;

