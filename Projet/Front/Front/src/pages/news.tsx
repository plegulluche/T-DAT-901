import React, { useState } from 'react';
import NewsKeywordsManagement from "../components/keywordsManagement";
import Jsondata from "../components/jsondata";

export default function NewsPage() {
  const [keywords, setKeywords] = useState<string[]>([]);

  return (
    <div className="flex p-5 gap-5">
      <NewsKeywordsManagement />
      <div className="flex w-full bg-[#1B1B1B] rounded-lg ml-[360px]">
        <Jsondata />
      </div>
    </div>
  );
}
