import React, { useState } from "react";
import NewsKeywordsManagement from "../components/keywordsManagement";
import Jsondata from "../components/jsondata";

export default function NewsPage() {
  const [keywords, setKeywords] = useState<string[]>(["bitcoin"]);

  return (
    <div className="flex p-5 gap-5">
      <NewsKeywordsManagement
        keywords={keywords}
        setKeywords={() => setKeywords(keywords)}
      />
      <div className="flex w-full bg-[#1B1B1B] rounded-lg ml-[360px]">
        <Jsondata keywords={keywords} />
      </div>
    </div>
  );
}
