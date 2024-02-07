import React, {useState, useEffect} from 'react';
import '../css/CryptoMain.scss';
import requests from '../api/Requests.js';
import axios from 'axios';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useUserContext } from '../component/UserContext';
import * as Table from "../component/table.jsx";

export function formatNumber(number) {
    if (number < 1000000) {
      return `$${number.toFixed(2)}`;
    } else if (number < 1000000000) {
      return `$${(number / 1000000).toFixed(1)} M`;
    } else {
      return `$${(number / 1000000000).toFixed(2)} B`;
    }
  }
  

export default function CryptoMain({}) {

    const [cryptoData, setCryptoData] = useState([]);
    const userData = useSelector((state) => state.userReducer)
    const {getUser} = useUserContext()
    const navigate = useNavigate()

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
        <div className='min-h-screen w-full mt-10 xl:px-[150px] px-[100px]'>
            <div className="flex flex-col">
                <p className='text-2xl text-white mb-4 font-normal'>Your Favorite Cryptos</p>
                <div className='bg-[#1C1C1C] p-4 rounded-lg min-h-[600px]'>
                    <Table.Table>
                    <Table.Thead>
                        <Table.Tr className="border-none">
                        <Table.Th className="border-none w-[3%] text-gray-400 text-xs font-semibold">#</Table.Th>
                        <Table.Th className="border-none w-[15%] text-gray-400 text-xs font-semibold">NAME</Table.Th>
                        <Table.Th className=" border-none w-[20%] text-gray-400 text-xs font-semibold">SYMBOL</Table.Th>
                        <Table.Th className=" border-none w-[30%] text-gray-400 text-xs font-semibold">MARKETCAP</Table.Th>
                        <Table.Th className=" border-none w-1/5 text-gray-400 text-xs font-semibold">TOTAL SUPPLY</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {cryptoData?.slice(0, 10).map((crypto, index) => (
                        <Table.Tr key={crypto.name} className="text-gray-100 border-gray-700 border-r-none border-l-none font-normal hover:cursor-pointer hover:bg-black/20" onClick={() => navigate(`/crypto/${crypto._id}`)}>
                            <Table.Td className="border-none"><p>
                                {index+1}
                                </p>
                            </Table.Td>
                            <Table.Td className="border-none"><p>
                                {crypto.name}
                                </p>
                            </Table.Td>
                            <Table.Td className="border-none">
                                {crypto.symbol}
                            </Table.Td>
                            <Table.Td className="border-none">
                                {formatNumber(crypto.marketCap.toFixed(2))}
                            </Table.Td>
                            <Table.Td className="border-none">
                                {formatNumber(crypto.totalSupply.toFixed(2))}
                            </Table.Td>
                            <Table.Td className="border-none py-3 text-end">
                                <button className='py-2 px-5 bg-amber-700 rounded-lg' onClick={() => navigate(`/crypto/${crypto._id}`, {crypto})}>
                                    Trade
                                </button>
                            </Table.Td>
                        </Table.Tr>
                                ))}
                    </Table.Tbody>
                    </Table.Table>
                    </div>
            </div>
            <Outlet />
        </div>
    )
}