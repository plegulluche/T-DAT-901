import React, { useState, useEffect, useRef } from "react";
import "../css/CryptoBadge.scss";

function TextLine({ lastQuantity, price, lastprice }) {
    const [trend, setTrend] = useState("text-green-500");

    useEffect(() => {
        if (lastprice !== null && price !== null) {
            setTrend(lastprice < price ? "text-green-500" : lastprice > price ? "text-red-500" : trend);
        }
    }, [lastprice, price]);

    return <p className={`text-[12px] ${trend}`}>{lastQuantity && parseFloat(lastQuantity).toFixed(2)}</p>;
}

function PriceTextLine({ price, lastprice }) {
    const [trend, setTrend] = useState("text-green-500");

    useEffect(() => {
        if (lastprice !== null && price !== null) {
            setTrend(lastprice < price ? "text-green-500" : lastprice > price ? "text-red-500" : trend);
        }
    }, [lastprice, price]);

    return <p className={`text-[12px] ${trend}`}>{price && parseFloat(price)}</p>;
}

export default function CryptoBadge({ symbol, index, websocketDataAggregation, height }) {
    const tab = useRef([]);
    const { lastPrice, initialPrice, lastQuantity } = websocketDataAggregation[symbol.symbol] ?? {};

    useEffect(() => {
        const newElement = { lastPrice, initialPrice, lastQuantity };
        tab.current.unshift(newElement);
    }, [lastPrice, initialPrice, lastQuantity]);

    return (
        <div key={index} className={`w-full bg-[#3A3A3A] ${height ? `h-[${height}px]` : "h-[200px]"} cursor-pointer text-white flex flex-col p-5 rounded-lg shadow-lg drop-shadow-lg `}>
            <div className="w-full h-full overflow-hidden">
                <div className="flex justify-between mb-4">
                    <p className="text-[20px] text-gray-200">{symbol.symbol}</p>
                </div>
                <div className="flex justify-between">
                    <div className="justify-end">
                        <p className="mb-1 text-[11px] text-[#9F9F9F]">Amount</p>
                        {tab.current.map((elem, index) => (
                            <TextLine key={index} lastQuantity={elem.lastQuantity} price={elem.lastPrice ?? elem.initialPrice} lastprice={tab.current[index + 1]?.lastPrice ?? tab.current[index + 1]?.initialPrice} />
                        ))}
                    </div>
                    <div className="flex flex-col text-[15px] items-end">
                        <p className="mb-1 text-[11px] text-[#9F9F9F]">Price</p>
                        {tab.current.map((elem, index) => (
                            <PriceTextLine key={index} price={elem.lastPrice ?? elem.initialPrice} lastprice={tab.current[index + 1]?.lastPrice ?? tab.current[index + 1]?.initialPrice} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
