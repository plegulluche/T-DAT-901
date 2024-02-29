import React from 'react';
import { useEffect } from 'react';
import Carousel from './Carousel';
import ChildCarousel from './ChildCarousel';
import Seartch from './Search';
import Loader from './Loader';
import Search from './Search';


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

  return (
    <div className='h-screen pt-8'>
      <div className='mb-5'>
        <Search />
      </div>
      { !data.length ? (<Loader />) : (
      <div className='h-full w-full flex flex-col sm:flex-row gap-10'>
        <div className='h-full flex justify-center w-[100%] sm:w-[45%]'>
          <Carousel slides={carouselSlides} />
        </div>
        <div className='w-full sm:w-[50%]'>
            <ChildCarousel slides={groupedArticles} />
        </div>
      </div>
      )}
      
    </div>
  );
}

export default Hero;