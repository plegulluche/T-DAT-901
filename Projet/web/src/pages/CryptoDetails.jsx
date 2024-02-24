import React, {useDebugValue, useEffect, useState} from 'react';
import axios from 'axios';
import requests from '../api/Requests';
import { useParams } from "react-router";
import WebsocketGraphic from '../component/WebsocketGraphic';
import { formatNumber } from './CryptoMain';
import moment from "moment"
import { useSelector } from 'react-redux';

export default function CryptoDetails(props) {

    const [cryptoDetails, setCryptoDetails] = useState([]);
    const crypto = useParams();
    const [prices, setPrices] = useState([]);
    const startDate = useSelector((state) => state.dateReducer.startDate);

    
    useEffect(() => {
        axios.get(requests.GetCryptoCoinById + crypto.cryptoId).then((response) => {
            setCryptoDetails(response.data);
        });
    }, [crypto]);

    const getCryptoPrice = async (fiat, coin, startDate, endDate ) => {
        await axios({
            method: "get",
            url: `http://localhost:8000/api/v1/historical-data?fiat=${fiat}&coin=${coin}&start_date=${startDate}&end_date=${endDate}`,
        }).then(e => {
            console.log("test",e.data.data)
            setPrices(e.data.data)
        })
    }

    useEffect(() => {
        if (cryptoDetails && cryptoDetails.cryptoCoin && startDate)
          getCryptoPrice("USD", cryptoDetails.cryptoCoin.symbol, startDate, moment().format("YYYY-MM-DD"));
      }, [cryptoDetails, startDate]);

    return (
        <div className='min-h-screen w-full flex flex-col lg:pl-[140px] pr-[80px] p-5 relative'>
            <div className='flex flex-col gap-5'>
            <div className='w-[100%] h-[140px] flex rounded-xl z-20 p-5 gap-5 items-center justify-center'>
                <div className='w-[380px] h-fit flex flex-col gap-2 items-center'>
                    <img className='w-[70px] h-[70px]' src={cryptoDetails?.cryptoCoin?.logoUrl} />
                    <h1 className='text-white w-fit text-[25px]'>{cryptoDetails?.cryptoCoin?.name}</h1>
                </div>
                <div className='bg-[#232323] border border-gray-500/50 shadow-lg w-full h-fit grid grid-cols-4 h-full items-center gap-2 justify-around p-2 rounded'>
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
                <div className='w-1/3 bg-[#232323] border border-gray-500/50 rounded p-3 flex flex-col gap-2 items-center shadow-xl'>
                    <p className='text-gray-200'>Feeling analysis</p>
                    <p className='text-green-500 font-bold text-4xl'>
                    <svg className='w-10 h-10 text-green-500' width="24px" height="24px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    ><path d="M16.4724 20H4.1C3.76863 20 3.5 19.7314 3.5 19.4V9.6C3.5 9.26863 3.76863 9 4.1 9H6.86762C7.57015 9 8.22116 8.6314 8.5826 8.02899L11.293 3.51161C11.8779 2.53688 13.2554 2.44422 13.9655 3.33186C14.3002 3.75025 14.4081 4.30635 14.2541 4.81956L13.2317 8.22759C13.1162 8.61256 13.4045 9 13.8064 9H18.3815C19.7002 9 20.658 10.254 20.311 11.5262L18.4019 18.5262C18.1646 19.3964 17.3743 20 16.4724 20Z" stroke="green" stroke-width="2" stroke-linecap="round"></path><path d="M7 20L7 9" stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </p>
                </div>
            </div>
            </div>
            <div className='mt-5'>
                {cryptoDetails?.cryptoCoinDetails?.tradingPairs !== undefined &&
                    <WebsocketGraphic prices={prices} symbols={cryptoDetails?.cryptoCoinDetails?.tradingPairs} tradeType={'!ticker@arr'}/>
                }
            </div>
        </div>
    )
}
