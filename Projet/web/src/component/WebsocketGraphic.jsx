import React, { useState, useEffect, useRef } from "react";
import { websocketConnectMulti } from '../api/websocket/binance.WEBSOCKET.connector';
import '../css/WebsocketGraphic.scss'
import CryptoBadge from "./CryptoBadge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

  
  function Chart({ symbol, websocketDataAggregation }) {
    const { lastPrice, initialPrice, lastQuantity } = websocketDataAggregation[symbol.symbol] ?? {};
    const [data, setData] = useState([]);
  
    useEffect(() => {
          const newElement = { lastPrice, initialPrice, lastQuantity };
          const newData = [...data, { name: "", value: parseFloat(newElement.lastPrice) }];
      
          if (newData.length > 50) {
            newData.shift();
          }
          const newMaxValue = Math.max(...newData.map(entry => entry.value));
          setData(newData);
  
    }, [lastPrice, initialPrice, lastQuantity]);
  
  
    return (
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
          }}
        >
          <XAxis fontSize={8} dataKey="name" tick="none" />
          <YAxis fontSize={8} domain={[46300, 46700]} />
          <Tooltip />
          <Line isAnimationActive={false} type="monotone" dataKey="value" stroke="#18C328" activeDot={{ r: 2, stroke: "green" }} dot={{r: 2, fills: "green"}} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  

export default function WebsocketGraphic(props) {
    const { symbols, tradeType } = props;
    const [websocketData, setWebsocketData] = useState([]);
    const [websocketDataAggregation, setWebsocketDataAggregation] = useState('');
    const [hasConnected, setHasConnected] = useState(false);
    const [klineSymbol, setKlineSymbol] = useState('');
    const websocketTerminate = useRef(null);

    useEffect(() => {
        const constructedObject = { ...websocketDataAggregation }
        Object.keys(constructedObject).forEach(key => key === 'undefined' && delete constructedObject[key])
        websocketData && websocketData.forEach(elem => { constructedObject[elem?.symbol] = elem; })
        setWebsocketDataAggregation(constructedObject);
    }, [websocketData]);

    useEffect(() => {
        websocketTerminate.current = websocketConnectMulti(symbols, tradeType, setHasConnected, setWebsocketData);
        return () => {
            websocketTerminate.current();
        }
    }, [symbols]);

    return (
        <div className="w-full">
            {symbols.find(el => el.quoteAsset === "USDT") && 
            <div className="flex gap-5">
                <div className="w-[300px]">
                    <CryptoBadge symbol={symbols.find(el => el.quoteAsset === "USDT")} height={500} index={0} websocketDataAggregation={websocketDataAggregation} />
                </div>
                <div className="w-full rounded-lg">
                    <div id="chart" className='bg-[#242424] w-full h-[500px] rounded-lg shadow-xl flex items-center justify-center' style={{ height: 500 }} >
                        <Chart symbol={symbols.find(el => el.quoteAsset === "USDT")} websocketDataAggregation={websocketDataAggregation}/>
                    </div>
                </div>
            </div>}
            <div>
                <p className='text-white text-2xl mb-5 mt-8'>Real-Time Transactions</p>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:grid-cols-4 gap-5 z-20 w-full">
                    {symbols?.map((symbol, index) => {
                        return (
                            <div>
                                <CryptoBadge symbol={symbol} index={index} websocketDataAggregation={websocketDataAggregation} />
                            </div>
                        )
                    })}
                    </div>
                </div>
        </div>
    )
}