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
            <div className='flex gap-10'>
                <div className='px-5 py-2 border rounded w-fit text-white border-white h-fit w-[110px] hover:cursor-pointer hover:bg-gray-500' onClick={() => navigate(-1)}>
                    <p>{"< Back"}</p>
                </div>
            {/* <img className='blur-md mx-5 w-[750px] h-[750px] absolute z-0 self-center opacity-20' src={cryptoDetails?.cryptoCoin?.logoUrl} /> */}
            <div className='w-[100%] h-fit flex bg-[#3A3A3A] rounded-xl z-20 p-5 gap-5'>
                <div className='w-2/3 h-fit flex lg:flex-row flex-col items-center'>
                    {/* <img className='mx-5 w-[90px] h-[90px]' src={cryptoDetails?.cryptoCoin?.logoUrl} /> */}
                    <h1 className='text-white w-fit text-[40px] ml-5'>{cryptoDetails?.cryptoCoin?.name}</h1>
                    {cryptoDetails?.cryptoCoinDetails?.description && <div className='h-[75%] max-h-[100px] w-full overflow-y-auto lg:px-10 mt-2 lg:mt-0'>
                        <p className='text-white text-[10px] ml-5 text-gray-200 font-normal'>{cryptoDetails.cryptoCoinDetails.description}</p>
                    </div>}
                </div>
                <div className='w-1/3 h-fit grid grid-cols-2 items-center gap-2 justify-around p-2 border rounded border-gray-500'>
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
            </div>
            </div>
            <div className='mt-10'>
                <p className='text-white text-2xl mb-5'>Real-Time Transactions</p>
                {cryptoDetails?.cryptoCoinDetails?.tradingPairs !== undefined &&
                    <WebsocketGraphic symbols={cryptoDetails?.cryptoCoinDetails?.tradingPairs} tradeType={'!ticker@arr'}/>
                }
            </div>
        </div>
    )
}
