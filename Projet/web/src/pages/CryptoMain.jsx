import React, {useState, useEffect, useRef} from 'react';
import '../css/CryptoMain.scss';
import requests from '../api/Requests.js';
import axios from 'axios';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useUserContext } from '../component/UserContext';
import * as Table from "../component/table.jsx";
import {BrightStar, NavArrowUp} from "iconoir-react"
import moment from "moment"
import { websocketConnectMulti } from '../api/websocket/binance.WEBSOCKET.connector.js';

export function formatNumber(number) {
    if (!number || !parseFloat(number)) return
    if (number < 1000000) {
      return `$${number.toFixed(2)}`;
    } else if (number < 1000000000) {
      return `$${(number / 1000000).toFixed(1)} M`;
    } else {
      return `$${(number / 1000000000).toFixed(2)} B`;
    }
}

function CryptoRowComparaison({crypto, index}) {
    const navigate = useNavigate()
    const [websocketData, setWebsocketData] = useState([]);
    const [websocketDataAggregation, setWebsocketDataAggregation] = useState('');
    const [cryptoDetails, setCryptoDetails] = useState([]);
    const websocketTerminate = useRef(null);
    const [hasConnected, setHasConnected] = useState(false);

    useEffect(() => {
        if (crypto.symbol === "BTC") {
            axios.get(requests.GetCryptoCoinById + crypto._id).then((response) => {
                setCryptoDetails(response.data);
            });
        }
    }, [crypto]);

    useEffect(() => {
        if (websocketData.length && crypto.symbol === "BTC") {
            const constructedObject = { ...websocketDataAggregation }
            Object.keys(constructedObject).forEach(key => key === 'undefined' && delete constructedObject[key])
            websocketData && websocketData.forEach(elem => { constructedObject[elem?.symbol] = elem; })
            setWebsocketDataAggregation(constructedObject);
        }
    }, [websocketData]);

    useEffect(() => {
        if (crypto.symbol === "BTC" && cryptoDetails && cryptoDetails.cryptoCoinDetails) {
            const pair = cryptoDetails?.cryptoCoinDetails?.tradingPairs
            console.log(pair)
            websocketTerminate.current = websocketConnectMulti(cryptoDetails?.cryptoCoinDetails?.tradingPairs, '!ticker@arr', setHasConnected, setWebsocketData);
        }
    }, [cryptoDetails]);


    return (
        <Table.Tr key={crypto.name} className="text-gray-100 border border-green-500 font-normal hover:cursor-pointer hover:bg-black/20 relative" onClick={() => navigate(`/crypto/${crypto._id}`)}>
            <Table.Td className="border-none">
            <div className='absolute top-[3px] left-[5px]'>
                <p className='text-[10px] text-green-500 font-semibold'>BASIC</p>
            </div>
                <p>
                    {index+1}
                </p>
            </Table.Td>
            <Table.Td className="border-none">
                <div className='flex items-center gap-4'>
                    <img src={crypto.logoUrl} width={25} height={25} />
                    <p>
                        {crypto.name}
                    </p>
                </div>
            </Table.Td>
            <Table.Td className="border-none">
                {crypto.symbol}
            </Table.Td>
            <Table.Td className="border-none">
                {formatNumber(crypto.marketCap?.toFixed(2))}
            </Table.Td>
            <Table.Td className="border-none">
                {formatNumber(crypto.totalSupply?.toFixed(2))}
            </Table.Td>
            <Table.Td className="border-none">
                {websocketDataAggregation["BTCEUR"] && <p>
                    {parseFloat(websocketDataAggregation["BTCEUR"]?.lastPrice).toFixed(2)} €
                </p>}
            </Table.Td>
            <Table.Td className="border-none py-3 text-end">
                <NavArrowUp width={25} height={25} strokeWidth={2} className='text-green-500' />
             </Table.Td>
        </Table.Tr>
    )
}

function CryptoRow({crypto, index}) {
    const navigate = useNavigate()

    return (
        <Table.Tr key={crypto.name} className={`relative text-gray-100 ${crypto.symbol === 'BTC' ? "border mt-2 border-orange-500" : "border-gray-400/20 border-r-none border-l-none"} font-normal hover:cursor-pointer hover:bg-black/20`} onClick={() => navigate(`/crypto/${crypto._id}`)}>
            <Table.Td className="border-none">
            {crypto.symbol === 'BTC' && <div className='absolute top-[3px] left-[5px]'>
                <p className='text-[10px] text-orange-500 font-semibold'>KAFKA</p>
            </div>}
                <p>
                    {index+1}
                </p>
            </Table.Td>
            <Table.Td className="border-none">
                <div className='flex items-center gap-4'>
                    <img src={crypto.logoUrl} width={25} height={25} />
                    <p>
                        {crypto.name}
                    </p>
                </div>
            </Table.Td>
            <Table.Td className="border-none">
                {crypto.symbol}
            </Table.Td>
            <Table.Td className="border-none">
                {formatNumber(crypto.marketCap?.toFixed(2))}
            </Table.Td>
            <Table.Td className="border-none">
                {formatNumber(crypto.totalSupply?.toFixed(2))}
            </Table.Td>
            <Table.Td className="border-none">
               
            </Table.Td>
            <Table.Td className="border-none py-3 text-end">
                <NavArrowUp width={25} height={25} strokeWidth={2} className='text-green-500' />
             </Table.Td>
        </Table.Tr>
    )
}
  
  

export default function CryptoMain({}) {

    const [cryptoData, setCryptoData] = useState([]);
    const userData = useSelector((state) => state.userReducer)
    const {getUser} = useUserContext()
    const [websocketDataAggregation, setWebsocketDataAggregation] = useState('');

    
    useEffect(() => {
        if (getUser() === 'anonymous') {
            const request = requests.GetAllPopularCryptoCoins
                axios.get(request)
                .then((resp) => {
                    setCryptoData(resp.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
        if (userData?._id) {
            const request = requests.GetUserCryptoListByUserId
            .replace('{id}', userData._id)
            axios.get(request)
            .then((response) => {
                if (response.data.length === 0) {
                    const request = requests.GetAllPopularCryptoCoins
                        axios.get(request)
                        .then((resp) => {
                            setCryptoData(resp.data)
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
                else setCryptoData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            const request = requests.GetAllPopularCryptoCoins
                axios.get(request)
                .then((response) => {
                    setCryptoData(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    }, [userData]);

    return (
        <div className='min-h-screen w-full mt-10 pb-10 xl:px-[150px] px-[100px]'>
            <div className="flex flex-col">
                <div className='flex items-center gap-5 mb-5'>
                    <BrightStar width={35} height={35} strokeWidth={2} className='text-purple-500' />
                    <p className='text-2xl text-white font-semibold'>Your Favorite Cryptos</p>
                </div>
                <div className='bg-[#232323] border border-gray-500/50 p-4 rounded-lg min-h-[600px] shadow-lg'>
                    <Table.Table>
                    <Table.Thead>
                        <Table.Tr className="border-none">
                        <Table.Th className="border-none w-[3%] text-gray-200/40 text-xs font-semibold">#</Table.Th>
                        <Table.Th className="border-none w-[40%] text-gray-200/40 text-xs font-semibold">NAME</Table.Th>
                        <Table.Th className=" border-none w-[15%] text-gray-200/40 text-xs font-semibold">SYMBOL</Table.Th>
                        <Table.Th className=" border-none w-[15%] text-gray-200/40 text-xs font-semibold">MARKETCAP</Table.Th>
                        <Table.Th className=" border-none w-[15%] text-gray-200/40 text-xs font-semibold">TOTAL SUPPLY</Table.Th>
                        <Table.Th className=" border-none w-[15%] text-gray-200/40 text-xs font-semibold">PRICE</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {cryptoData?.slice(0, 10).map((crypto, index) => (
                            <>
                                {crypto.symbol === "BTC" && <CryptoRowComparaison crypto={crypto} key={index} index={index}/>}
                                <CryptoRow crypto={crypto} key={index} index={index}/>
                            </>
                        ))}
                    </Table.Tbody>
                    </Table.Table>
                    </div>
            </div>
            <Outlet />
        </div>
    )
}