import React, {useState, useEffect} from 'react';
import '../css/CryptoMain.scss';
import requests from '../api/Requests.js';
import axios from 'axios';
import CryptoSlice from '../component/CryptoSlice.jsx';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useUserContext } from '../component/UserContext';

export default function CryptoMain({}) {

    const [cryptoData, setCryptoData] = useState([]);
    const [reset, setReset] = useState(false);
    const userData = useSelector((state) => state.userReducer)
    const {getUser} = useUserContext()

    useEffect(() => {
        if (userData?._id) {
            const request = requests.GetUserCryptoListByUserId
            .replace('{id}', userData._id)
            axios.get(request)
            .then((response) => {
                if (response.data.length === 0) {
                    const request = requests.GetAllPopularCryptoCoins
                        axios.get(request)
                        .then((response) => {
                            setCryptoData(response.data)
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
    }, [userData]);

    
    function loadMore() {
        // const request = requests.apiUrl + pages?.next.url;

        // axios.get(request)
        // .then((response) => {
        //     setCryptoData(response.data.cryptoCoins);
        //     setPages({next: response.data.pages[1], prev: response.data.pages[0]});
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    }


    return (
        <div className='min-h-screen w-full mt-10 xl:px-[150px] px-[100px]'>
            <div className="flex flex-col mt-5">
                <p className='text-3xl text-white mb-10'>Select crypto </p>
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                    {cryptoData?.slice(0, 10).map((crypto, index) => (
                        <CryptoSlice key={index} name={crypto.name} symbol={crypto.symbol} logoUrl={crypto.logoUrl} id={crypto._id}/>
                    ))}
                </div>
                <div className='flex self-center items-center mt-5'>
                    <button className="h-fit bg-[#545454] text-gray-300 hover:opacity-80 font-bold px-10 py-3 rounded-lg" onClick={()=> setReset(!reset)}>
                        Reset
                    </button>          
                    <button className="h-fit m-5 bg-[#545454] text-gray-300 hover:opacity-80 font-bold px-10 py-3 rounded-lg" onClick={loadMore}>
                        Next page
                    </button>
                </div>   
            </div>
            <Outlet />
        </div>
    )
}