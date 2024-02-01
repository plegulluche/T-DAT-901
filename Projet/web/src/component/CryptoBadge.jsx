import React, { useState, useEffect, useRef } from "react";
import "../css/CryptoBadge.scss";

export default function CryptoBadge({ symbol, index, websocketDataAggregation }) {
    const [trend, setTrend] = useState(null)
    let tab = useRef([])

    useEffect(() => {
        setTrend(null)
    }, [symbol])

    useEffect(() => {
        const { lastPrice, initialPrice, lastQuantity } = websocketDataAggregation[symbol.symbol] ?? {};
        tab.current.unshift({ lastPrice, initialPrice, lastQuantity })
        if (tab?.current.length > 5)
            tab.current.pop()

        const valueTrend = tab.current.reduce(
            (acc, curr) => acc + (parseFloat(curr.lastPrice ?? curr.initialPrice)), 0)
        const highOrLow = tab.current.length * (tab.current[0].lastPrice ?? tab.current[0].initialPrice) - valueTrend;
        setTrend(highOrLow)
    }, [websocketDataAggregation])

    // const getIcon = () => {
    //     if (trend > 0) return <svg width="20px" className="mt-1" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="green"><path d="M4.031 8.917l15.477-4.334a.5.5 0 01.616.617l-4.333 15.476a.5.5 0 01-.94.067l-3.248-7.382a.5.5 0 00-.256-.257L3.965 9.856a.5.5 0 01.066-.94z" stroke="#41C621" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    //     if (trend < 0) return <svg width="20px" className="mt-1 rotate-[90deg]" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="red"><path d="M4.031 8.917l15.477-4.334a.5.5 0 01.616.617l-4.333 15.476a.5.5 0 01-.94.067l-3.248-7.382a.5.5 0 00-.256-.257L3.965 9.856a.5.5 0 01.066-.94z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    //     else return <div></div>
    // }
    const cssClass = () => {
        if (trend > 0) return "crypto-animation_green"
        if (trend < 0) return "crypto-animation_red"
        else return "crypto-animation"
    }
    return (
        // <Draggable onDrag={(e) => console.log(e)}>
            <div key={index} className={'w-full h-[200px] cursor-pointer text-white flex flex-col p-5 rounded-lg shadow-lg drop-shadow-lg ' + cssClass()}>
                <div className="w-full h-full overflow-hidden">
                    <div className="flex justify-between mb-4">
                        <p className="text-[20px] text-gray-200">{symbol.symbol}</p>
                        {/* {getIcon()} */}
                    </div>
                    <div className="flex justify-between">
                        <div className="justify-end">
                            <p className="mb-1 text-[14px] text-[#9F9F9F]">Amount</p>
                            {tab.current.map(elem => {
                                return (
                                    <p className="text-[12px]">{elem.lastQuantity && elem.lastQuantity}</p>
                                )
                            })}
                        </div>
                        <div className="flex flex-col text-[15px] items-end">
                            <p className="mb-1 text-[14px] text-[#9F9F9F]">Price</p>
                            {tab.current.map(elem => {
                                const price = elem?.lastPrice ?? elem?.initialPrice;
                                return (
                                    price && <p className="text-[12px]">{parseFloat(price)}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        // </Draggable>
    )
}