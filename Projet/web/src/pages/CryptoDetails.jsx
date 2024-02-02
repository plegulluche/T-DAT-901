import React, {useDebugValue, useEffect, useState} from 'react';
import axios from 'axios';
import requests from '../api/Requests';
import { useParams } from "react-router";
import WebsocketGraphic from '../component/WebsocketGraphic';
import KlineChart from '../component/KlineChart';
import { formatNumber } from './CryptoMain';
import { useNavigate } from 'react-router-dom';

export default function CryptoDetails(props) {

    const [cryptoDetails, setCryptoDetails] = useState([]);
    const crypto = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get(requests.GetCryptoCoinById + crypto.cryptoId).then((response) => {
            setCryptoDetails(response.data);
        });
    }, [crypto]);

    return (
        <div className='min-h-screen w-full flex flex-col lg:pl-[140px] pr-[80px] p-5 relative'>
            <div className='flex flex-col gap-5'>
            {/* <img className='blur-md mx-5 w-[750px] h-[750px] absolute z-0 self-center opacity-20' src={cryptoDetails?.cryptoCoin?.logoUrl} /> */}
            <div className='w-[100%] h-fit flex rounded-xl z-20 p-5 gap-5'>
                <div className='w-1/3 h-fit flex lg:flex-row flex-col items-center'>
                    {/* <img className='mx-5 w-[90px] h-[90px]' src={cryptoDetails?.cryptoCoin?.logoUrl} /> */}
                    <h1 className='text-white w-fit text-[35px] ml-5'>{cryptoDetails?.cryptoCoin?.name}</h1>
                </div>
                <div className='bg-[#3A3A3A]  w-1/3 h-fit grid grid-cols-2 items-center gap-2 justify-around p-2 border rounded border-gray-500'>
                    <div className='flex flex-col items-center mb-1'>
                        <p className='text-gray-400 text-[12px]'>MarketCap</p>
                        <p className='text-white text-[14px]'>{cryptoDetails?.cryptoCoinDetails?.marketCap && formatNumber(cryptoDetails.cryptoCoinDetails.marketCap.toFixed(2))} $</p>
                    </div>
                    <div className='flex flex-col items-center mb-1'>
                        <p className='text-gray-400 text-[12px]'>Total supply</p>
                        <p className='text-white text-[14px]'>{formatNumber(cryptoDetails?.cryptoCoinDetails?.totalSupply)}</p>
                    </div>
                    <div className='flex flex-col items-center mb-1'>
                        <p className='text-gray-400 text-[12px]'>Circulating supply</p>
                        <p className='text-white text-[14px]'>{formatNumber(cryptoDetails?.cryptoCoinDetails?.circulatingSupply)}</p>
                    </div>
                    <div className='flex flex-col items-center mb-1'>
                        <p className='text-gray-400 text-[12px]'>Links</p>
                        <p className='text-white text-[14px] w-[100px] truncate'>{cryptoDetails?.cryptoCoinDetails?.links}</p>
                    </div>
                </div>
                <div className='w-1/3 bg-[#3A3A3A]  border rounded border-gray-500 p-3 flex flex-col gap-2 items-center'>
                    <p className='text-gray-200'>Feeling analysis</p>
                    <p className='text-green-500 font-bold text-4xl'>GOOD</p>
                </div>
            </div>
            </div>
            <div className='mt-5'>
                {cryptoDetails?.cryptoCoinDetails?.tradingPairs !== undefined &&
                    <WebsocketGraphic symbols={cryptoDetails?.cryptoCoinDetails?.tradingPairs} tradeType={'!ticker@arr'}/>
                }
            </div>
        </div>
    )
}
