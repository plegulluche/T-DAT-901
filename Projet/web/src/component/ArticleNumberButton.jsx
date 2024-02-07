import React, { useState } from 'react';

export default function ArticleNumberButton({onChange, count}) {

  const onChangeCount = (newCount) => {
    if (newCount > 20) onChange(20)
    else if (newCount < 0) onChange(0)
    else onChange(newCount)
  }

  return (
    <div>
      <div className='flex justify-center items-center gap-4'>
        <button type="button" class="text-white bg-[#686868] hover:bg-gray-600 rounded-lg text-lg w-[35px] h-[35px]"
          onClick={() => onChangeCount(count - 2)}> - </button>
        <p className='text-[#ffbe0b] text-xl'>{count}</p>
        <button type="button" class="text-white bg-[#686868] hover:bg-gray-600 rounded-lg text-lg w-[35px] h-[35px]" 
          onClick={() => onChangeCount(count + 2)}> + </button>
      </div>
    </div>
  )


}

