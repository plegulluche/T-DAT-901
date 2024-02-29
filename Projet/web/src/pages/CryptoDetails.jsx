import React, {useDebugValue, useEffect, useState} from 'react';
import axios from 'axios';
import requests from '../api/Requests';
import { useParams } from "react-router";
import WebsocketGraphic from '../component/WebsocketGraphic';
import { formatNumber } from './CryptoMain';
import moment from "moment"
import { useSelector } from 'react-redux';
import { Pie, PieChart } from 'recharts';
import { ThumbsDown, ThumbsUp } from 'iconoir-react';

export default function CryptoDetails(props) {

    const [cryptoDetails, setCryptoDetails] = useState([]);
    const crypto = useParams();
    const [prices, setPrices] = useState([]);
    const [ws, setWs] = useState(null); // WebSocket state
    const startDate = useSelector((state) => state.dateReducer.startDate);
    const [kafkaPrice, setKafakPrice] = useState()
    const [feeling, setFeeling] = useState()

    
    useEffect(() => {
        axios.get(requests.GetCryptoCoinById + crypto.cryptoId).then((response) => {
            setCryptoDetails(response.data);
        });
    }, [crypto]);

    useEffect(() => {
        // Initialize WebSocket connection
        if (cryptoDetails?.cryptoCoin?.symbol === undefined) return;
        const webSocket = new WebSocket(`ws://localhost:8000/ws/${cryptoDetails?.cryptoCoin?.symbol}`);
        
        webSocket.onopen = () => {
            console.log('WebSocket Connected');
            // Subscribe to a specific cryptocurrency updates, adjust as per your WebSocket server's protocol
            webSocket.send(JSON.stringify({ action: 'subscribe', symbol: cryptoDetails?.cryptoCoin?.symbol}));
        };
        
        webSocket.onmessage = (event) => {
            console.log('Received message from server');
            try {
                const data = JSON.parse(event.data);
                if (data && data.value && data.value.price) {
                    setKafakPrice(data.value.price["EUR"])
                }
                // Update your state or perform actions based on the message data
            } catch (error) {
                console.error('Error parsing message data:', error);
            }
        };
        
        webSocket.onerror = (error) => {
            console.error('WebSocket Error ', error);
        };
        
        webSocket.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        setWs(webSocket);

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if (webSocket) {
                webSocket.close();
            }
        };
    }, [cryptoDetails]); // Depend on the crypto symbol for reconnection

    const getCryptoPrice = async (fiat, coin, startDate, endDate) => {
        await axios({
            method: "get",
            url: `http://localhost:8000/api/v1/historical-data?fiat=${fiat}&coin=${coin}&start_date=${startDate}&end_date=${endDate}`,
        }).then(e => {
            setPrices(e.data.data);
        });
    }

    const getCryptoFeeling = async (fiat, coin, startDate, endDate) => {
        // await axios({
        //     method: "get",
        //     url: `http://localhost:8000/api/v1/sentiment-analysis`,
        // }).then(e => {
        //     console.log("feeling", e)
        //     setFeeling(e.data.data)
        // });
    }
    

    useEffect(() => {
        if (cryptoDetails && cryptoDetails.cryptoCoin && startDate) {
            getCryptoFeeling()
            getCryptoPrice("EUR", cryptoDetails.cryptoCoin.symbol, startDate, moment().format("YYYY-MM-DD"));
        }
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
                <div className={`w-1/3 bg-[#232323] border ${true ? "border-green-500" : "border-red-500"} rounded p-3 flex flex-col gap-2 items-center shadow-xl`}>
                    <p className='text-gray-200'>Feeling analysis</p>
                    <p className='text-green-500 font-bold text-4xl'>
                    {true ? 
                        <ThumbsUp className='w-10 h-10 text-green-500' />
                : (
                    <ThumbsDown className='w-10 h-10 text-red-500' />
                )}
                    </p>
                </div>
            </div>
            </div>
            <div className='mt-5'>
                {cryptoDetails?.cryptoCoinDetails?.tradingPairs !== undefined &&
                    <WebsocketGraphic prices={prices}  kafkaPrice={kafkaPrice} symbols={cryptoDetails?.cryptoCoinDetails?.tradingPairs} tradeType={'!ticker@arr'}/>
                }
            </div>
        </div>
    )
}
