import React from "react";

type ArticleContent = {
  link: string;
  image: string;
  name: string;
  desc: string;
};

type MainArticleProps = {
  content: ArticleContent;
};

function MainArticle({ content }: MainArticleProps) {
  return (
    <div className="bg-[#3A3A3A] w-[840px] p-5 rounded-lg mb-5">
      <div className="w-full">
        <img
          src={content.image}
          alt="hero"
          className="h-fit w-full rounded-xl"
        />
      </div>
      <div className="py-10 flex gap-5">
        <p className="text-[#771Fed] text-4xl cursor-pointer hover:text-purple-700 ml-5">
          {content.name}
        </p>
        <div>
          <p className="text-[#FFFFFF]">{content.desc}</p>
          <a href={content.link} target="_blank" rel="noreferrer">
            <button className="shadow-lg h-fit mt-10 bg-[#686868] text-gray-100 hover:opacity-80 font-bold px-10 py-3 rounded-lg">
              Read more
            </button>
          </a>
        </div>
      </div>
      <hr className="my-5" />
    </div>
  );
}

type BasicArticleProps = {
  content: ArticleContent;
};

function BasicArticle({ content }: BasicArticleProps) {
  return (
    <div>
      <a href={content.link} target="_blank" rel="noreferrer">
        <h4 className="text-2xl font-black text-[#ffbe0b] mb-5 cursor-pointer hover:text-amber-500">
          {content.name}
        </h4>
      </a>
      <p className="text-[#FFFFFF] opacity-60 mt-3">{content.desc}</p>
      <hr className="my-5" />
    </div>
  );
}

type ArticlesProps = {
  data: ArticleContent[];
};

const Articles: React.FC<ArticlesProps> = ({ data }) => {
  // You can set this to any number you want. This is just a default value.
  const displayCount = 10;

  if (!data) return <div>Loading...</div>;

  return (
    <div className="my-10 gap-10 flex flex-col sm:flex-row bg-[#252525]">
      <div>
        {data.slice(0, displayCount / 2).map((content, index) => (
          <MainArticle key={index} content={content} />
        ))}
      </div>
      {/* <div className='bg-[#3A3A3A] rounded-lg p-10'>
        {data.slice(0, displayCount / 2).map((content, index) => <BasicArticle key={index} content={content} />)}
      </div> */}
    </div>
  );
};

export default Articles;
