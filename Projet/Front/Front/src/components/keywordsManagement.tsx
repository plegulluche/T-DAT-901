// import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";
// import requests from "../../api/Requests"

function Keyword(props: {
  keyword: string;
  deleteKeyword: (keyword: string) => void;
}) {
  return (
    <div className="w-[300px] h-[45px] rounded-lg flex justify-between items-center px-5 bg-[#2E2E2E] mb-3">
      <div className="flex items-center gap-5">
        <svg
          width="22px"
          height="22px"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
        >
          <path
            d="M10 12a4 4 0 11-8 0 4 4 0 018 0zm0 0h12v3M18 12v3"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <p className="text-gray-300">{props.keyword}</p>
      </div>
      <p
        className="text-red-500 text-lg mb-1 hover:cursor-pointer"
        onClick={() => props.deleteKeyword(props.keyword)}
      >
        x
      </p>
    </div>
  );
}

export default function NewsKeywordsManagement({}) {
  const [newKeyword, setNewKeyword] = useState(false);
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const addNewKeyword = () => {
    setKeywords([...keywords, input]);
    setInput("");
    setNewKeyword(false);
  };

  const deleteKeyword = (keyword: string) => {
    setKeywords(keywords.filter((elem) => elem !== keyword));
  };

  if (!keywords) return <p>Loading</p>;
  return (
    <div className="h-[700px] flex flex-col bg-[#1B1B1B] p-5 rounded-lg">
      <p className="text-gray-100 text-2xl font-bold mb-5">News keywords</p>
      <div className="max-h-[320px] overflow-y-auto">
        {keywords.map((elem: string, index: number) => (
          <Keyword
            key={index}
            keyword={elem}
            deleteKeyword={(keyword: string) => deleteKeyword(keyword)}
          />
        ))}
      </div>
      {newKeyword && (
        <div className="w-[300px] h-[45px] rounded-lg flex justify-between items-center px-5 bg-[#2E2E2E]">
          <div className="flex items-center gap-5">
            <svg
              width="24px"
              height="24px"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M14.992 18h3m3 0h-3m0 0v-3m0 3v3M12.412 10.343a4 4 0 105.657-5.657 4 4 0 00-5.657 5.657zm0 0l-8.485 8.485 2.121 2.122M6.755 16l2.122 2.121"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-gray-300 w-[100%] mr-5 bg-[#2E2E2E] border border-gray-500 rounded-lg px-2 py-1"
            ></input>
          </div>
          <div
            className="w-[50px] h-[25px] bg-[#68A165] rounded flex items-center justify-center hover:cursor-pointer hover:opacity-80"
            onClick={() => addNewKeyword()}
          >
            <p className="text-gray-200 text-[12px]">Add</p>
          </div>
        </div>
      )}
      <div
        className="w-[300px] h-[35px] mt-3 border-2 border-dashed rounded-lg border-gray-600 flex items-center justify-center hover:bg-[#2E2E2E] hover:cursor-pointer"
        onClick={() => setNewKeyword(!newKeyword)}
      >
        <p className="text-gray-500 text-2xl mb-2">+</p>
      </div>
    </div>
  );
}
