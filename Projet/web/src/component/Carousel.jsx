import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
          <div key={index} className='flex flex-col h-full justify-between bg-white rounded-lg shadow-md overflow-hidden'>
            <div className="flex-grow p-4 flex flex-col justify-between h-full"> {/* Use flex-grow to take available space */}
              <div className="text-sm font-medium text-indigo-600">TRENDING NOW</div>
              <h3 style={titleStyle} className="text-5xl font-bold text-gray-900 mt-2 line-clamp-2" >{slide.title}</h3>
              <p style={descStyle} className="mt-2 text-gray-600 line-clamp-3">{slide.description}</p>
              <a href={slide.link} target="_blank" rel="noreferrer" className="self-start mt-4">
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Read article</button>
              </a>
            </div>
            {/* Image container takes remaining space */}
            <div className="relative w-[80%] rounded-2xl overflow-hidden items-center mx-auto my-4 " style={{ height: '300px' }}> {/* Adjust the height as needed */}
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
