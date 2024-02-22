import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavArrowLeft } from 'iconoir-react';

export const Carousel = ({ slides }) => {

  const titleStyle = {
    WebkitLineClamp: 4,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minHeight: '3.6em', // Adjust based on your font-size to fit two lines
  };

  const descStyle = {
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    minHeight: '2.5em', // Adjust based on your font-size to fit three lines
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    fade: true,
    adaptiveHeight: true,
    lazyLoad: 'ondemand',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="w-full h-full"> {/* Use h-full to take full height */}
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className='flex flex-col h-full justify-between bg-[#232323] border border-gray-500/50 rounded-lg shadow-md overflow-hidden'>
            <div className="p-6 flex flex-col h-[350px]"> {/* Use flex-grow to take available space */}
              <p className="text-sm font-medium text-purple-500">TRENDING NOW</p>
                <p style={titleStyle} className="text-4xl font-bold mt-2  text-gray-200" >{slide.title}</p>
              <div className='flex flex-col gap-2 mt-5'>
                <p style={descStyle} className="mt-2 text-gray-300/50">{slide.description}</p>
              <a href={slide.link} target="_blank" rel="noreferrer" className="self-start mt-4">
                <button type="button" className="text-gray-200 hover:bg-purple-700 bg-purple-500 focus:outline-none  rounded-lg text-sm px-5 py-2.5">Read article</button>
              </a>
              </div>
            </div>

              <div className="relative p-6 w-[92%] rounded-xl overflow-hidden items-center mx-auto my-4 " style={{ height: '300px' }}> {/* Adjust the height as needed */}
                <img src={slide.image} alt={slide.alt} className='absolute top-0 left-0 w-[100%] h-[100%]  object-cover' />
              </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom arrow components using Tailwind CSS for styling
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} z-10`}
      onClick={onClick}
    >
      <div className="next-arrow  text-white p-2 rounded-full  cursor-pointer">
        →
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} z-10`}
      onClick={onClick}
    >
      <div className="prev-arrow text-white p-2 rounded-full  cursor-pointer">
        ←
      </div>
    </div>
  );
}

export default Carousel;
