import React, { useState, useEffect, useRef } from "react";
import "../css/CryptoBadge.scss";

function TextLine({ lastQuantity, index, price, lastprice, trend, setTrend }) {
    const cssClass = () => {
        if (lastprice < price) {
            return "text-green-500"; // Prix actuel plus élevé que le prix précédent, couleur verte
        } else if (lastprice > price) {
            return "text-red-500"; // Prix actuel plus bas que le prix précédent, couleur rouge
        } else {
            // Même prix, utilisez la dernière tendance
            return trend === "up" ? "text-green-500" : "text-red-500";
        }
    };

    return (
        <p className={`text-[12px] ${cssClass()}`}>{lastQuantity && parseFloat(lastQuantity).toFixed(2)}</p>
    );
}

function PriceTextLine({ index, price, lastprice, trend, setTrend }) {
    const cssClass = () => {
        if (lastprice < price) {
            return "text-green-500"; // Prix actuel plus élevé que le prix précédent, couleur verte
        } else if (lastprice > price) {
            return "text-red-500"; // Prix actuel plus bas que le prix précédent, couleur rouge
        } else {
            // Même prix, utilisez la dernière tendance
            return trend === "up" ? "text-green-500" : "text-red-500";
        }
    };

    return <p className={`text-[12px] ${cssClass()}`}>{price && parseFloat(price)}</p>;
}

export default function CryptoBadge({ symbol, index, websocketDataAggregation, height }) {
    let tab = useRef([]);
    const { lastPrice, initialPrice, lastQuantity } = websocketDataAggregation[symbol.symbol] ?? {};
    const [trend, setTrend] = useState();

    useEffect(() => {
        tab.current.unshift({ lastPrice, initialPrice, lastQuantity });
    }, [websocketDataAggregation]);

    return (
        <div key={index} className={`w-full bg-[#3A3A3A] ${height ? `h-[${height}px]` : "h-[200px]"} cursor-pointer text-white flex flex-col p-5 rounded-lg shadow-lg drop-shadow-lg `}>
            <div className="w-full h-full overflow-hidden">
                <div className="flex justify-between mb-4">
                    <p className="text-[20px] text-gray-200">{symbol.symbol}</p>
                    {/* {getIcon()} */}
                </div>
                <div className="flex justify-between">
                    <div className="justify-end">
                        <p className="mb-1 text-[11px] text-[#9F9F9F]">Amount</p>
                        {tab.current.map((elem, index) => {
                            const price = elem?.lastPrice ?? elem?.initialPrice;
                            let lastprice = 0;
                            lastprice = tab.current[index - 1]?.lastPrice ?? tab.current[index - 1]?.initialPrice;
                            return <TextLine key={index} lastQuantity={elem.lastQuantity} index={index} price={price} lastprice={lastprice} trend={trend} setTrend={(e) => setTrend(e)} />;
                        })}
                    </div>
                    <div className="flex flex-col text-[15px] items-end">
                        <p className="mb-1 text-[11px] text-[#9F9F9F]">Price</p>
                        {tab.current.map((elem, index) => {
                            const price = elem?.lastPrice ?? elem?.initialPrice;
                            let lastprice = 0;
                            lastprice = tab.current[index - 1]?.lastPrice ?? tab.current[index - 1]?.initialPrice;
                            // if (lastprice < price) {
                            //     setTrend("up");
                            // } else if (lastprice > price) {
                            //     setTrend("down");
                            // }

                            return price && <PriceTextLine key={index} index={index} price={price} lastprice={lastprice} trend={trend} setTrend={(e) => setTrend(e)} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}