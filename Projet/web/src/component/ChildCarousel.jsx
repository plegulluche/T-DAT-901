import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MainArticle({ content }) {
  const titleStyle = {
    WebkitLineClamp: 2,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minHeight: "2.5em", // Adjust based on your font-size to fit two lines
  };

  const descStyle = {
    WebkitLineClamp: 2,
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minHeight: "2.5em", // Adjust based on your font-size to fit three lines
  };

  return (
    <div
      className="bg-[#232323] border border-gray-500/50 flex flex-col p-4 rounded-lg mb-4 ml-4 overflow-hidden"
      style={{ minHeight: "100%" }}
    >
      <div className="w-full flex-shrink-0">
        <img
          src={content.image}
          alt={content.title}
          className="h-40 w-full rounded-xl object-cover object-center"
        />
      </div>
      <div className="flex flex-col flex-grow pt-4">
        <p
          style={titleStyle}
          className="text-gray-300 text-lg cursor-pointer hover:text-purple-500"
        >
          {content.name}
        </p>
        {/* <p style={descStyle} className='text-gray-300 font-normal flex-grow'>{content.desc}</p> */}
      </div>
      {/* Link and button can be uncommented if needed, ensure to use mt-auto to push it to the bottom */}
    </div>
  );
}

const ChildCarousel = ({ slides }) => {
  let sliderRef = useRef(null);
  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: false,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    rows: 1,
    slidesPerRow: 2,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="h-full flex flex-col">
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {slides.map((group, index) => (
          // Adjust the grid to have 4 columns instead of 2 for a row of 4 articles
          <div key={index} className="grid grid-cols-2 gap-4">
            {group.map((content, index) => (
              <MainArticle key={index} content={content} />
            ))}
          </div>
        ))}
      </Slider>
      <div className="text-center pb-4 mt-5 ml-5">
        <button
          onClick={previous}
          className="bg-purple-500 p-2 rounded-full shadow-md mx-2 focus:outline-none hover:bg-purple-700"
        >
          <svg
            className="w-6 h-6 text-gray-200"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button
          onClick={next}
          className="bg-purple-500 p-2 rounded-full shadow-md mx-2 focus:outline-none hover:bg-purple-700"
        >
          <svg
            className="w-6 h-6 text-gray-200"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} z-10`}
//       style={{ ...style, display: "block", background: "grey" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={`${className} z-10`}
//       style={{ ...style, display: "hidden", background: "grey" }}
//       onClick={onClick}
//     />
//   );
// }

export default ChildCarousel;
