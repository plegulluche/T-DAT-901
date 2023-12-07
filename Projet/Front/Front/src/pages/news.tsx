import React, { useState } from 'react';
import NewsKeywordsManagement from "../components/keywordsManagement";
import Jsondata from "../components/jsondata";

export default function NewsPage() {
  const [keywords, setKeywords] = useState<string[]>([]);

  return (
    <div className="flex p-5 gap-5">
      <NewsKeywordsManagement keywords={keywords} setKeywords={setKeywords} />
      <div className="flex bg-[#1B1B1B] rounded-lg w-full">
        <Jsondata keywords={keywords} />
      </div>
    </div>
  );
}
