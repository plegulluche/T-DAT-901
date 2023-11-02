// NEWS PAGE //

import NewsKeywordsManagement from "../components/keywordsManagement";

export default function NewsPage() {
  return (
    <div className="flex p-5 gap-5">
      <NewsKeywordsManagement />
      <div className="flex w-full h-[700px] bg-[#1B1B1B] rounded-lg"></div>
    </div>
  );
}
