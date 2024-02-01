import React, {useEffect, useState} from 'react';
import axios from 'axios';
import requests from '../api/Requests';
import { useParams } from "react-router";
import WebsocketGraphic from '../component/WebsocketGraphic';
import KlineChart from '../component/KlineChart';

export default function CryptoDetails(props) {

    const [cryptoDetails, setCryptoDetails] = useState([]);
    const crypto = useParams();
    
    useEffect(() => {
        axios.get(requests.GetCryptoCoinById + crypto.cryptoId).then((response) => {
            setCryptoDetails(response.data);
        });
    }, [crypto]);

    return (
        <div className='min-h-screen w-full flex flex-col items-center lg:px-[150px] px-[100px] px-[50px] p-5 relative'>
            <img className='blur-md mx-5 w-[750px] h-[750px] absolute z-0 self-center opacity-20' src={cryptoDetails?.cryptoCoin?.logoUrl} />
            <div className='w-[100%] h-fit flex flex-col bg-[#3A3A3A] rounded-xl mb-10 z-20'>
                <div className='w-full h-fit flex lg:flex-row flex-col p-5 items-center mt-5'>
                    <img className='mx-5 w-[90px] h-[90px]' src={cryptoDetails?.cryptoCoin?.logoUrl} />
                    <h1 className='text-white w-fit text-[40px] ml-2'>{cryptoDetails?.cryptoCoin?.name}</h1>
                    {cryptoDetails?.cryptoCoinDetails?.description && <div className='h-[75%] max-h-[80px] w-full overflow-y-scroll lg:px-20 mt-5 lg:mt-0'>
                        <p className='text-white text-[12px] ml-5'>{cryptoDetails.cryptoCoinDetails.description}</p>
                    </div>}
                </div>
                <div className='w-[70%] h-[3px] bg-[#575757] self-center'></div>
                <div className='w-full h-fit grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-4 items-center justify-around p-5'>
                    <div className='flex flex-col items-center gap-2 xl:mb-0 mb-3'>
                        <p className='text-gray-400 text-[16px] lg:text-[18px]'>MarketCap</p>
                        <p className='text-white text-[18px] lg:text-[20px]'>{cryptoDetails?.cryptoCoinDetails?.marketCap && cryptoDetails.cryptoCoinDetails.marketCap.toFixed(2)} $</p>
                    </div>
                    <div className='flex flex-col items-center gap-2 xl:mb-0 mb-3'>
                        <p className='text-gray-400 text-[16px] lg:text-[18px]'>Total supply</p>
                        <p className='text-white text-[18px] lg:text-[20px]'>{cryptoDetails?.cryptoCoinDetails?.totalSupply}</p>
                    </div>
                    <div className='flex flex-col items-center gap-2 xl:mb-0 mb-3'>
                        <p className='text-gray-400 text-[16px] lg:text-[18px]'>Circulating supply</p>
                        <p className='text-white text-[18px] lg:text-[20px]'>{cryptoDetails?.cryptoCoinDetails?.circulatingSupply}</p>
                    </div>
                    <div className='flex flex-col items-center gap-2 xl:mb-0 mb-3'>
                        <p className='text-gray-400 text-[16px] lg:text-[18px]'>Links</p>
                        <p className='text-white text-[18px] lg:text-[20px] w-[250px] truncate'>{cryptoDetails?.cryptoCoinDetails?.links}</p>
                    </div>
                </div>
            </div>
            {cryptoDetails?.cryptoCoinDetails?.tradingPairs !== undefined &&
                <WebsocketGraphic symbols={cryptoDetails?.cryptoCoinDetails?.tradingPairs} tradeType={'!ticker@arr'}/>
            }
        </div>
    )
}
