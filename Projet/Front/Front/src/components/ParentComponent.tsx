import React, { useState } from 'react';
import Jsondata from './jsondata';
import NewsKeywordsManagement from './keywordsManagement';

function ParentComponent() {
  const [keywords, setKeywords] = useState<string[]>(['crypto', 'technology']);

  return (
    <div>
      <NewsKeywordsManagement keywords={keywords} setKeywords={setKeywords} />
      <Jsondata keywords={keywords} />
    </div>
  );
}

export default ParentComponent;
