import ArticleNumberButton from "../component/ArticleNumberButton";
import CryptoSelection from "../component/profile/cryptosManagement";
import { useState, useEffect } from "react";
import axios from "axios";
import requests from "../api/Requests"
import { useSelector } from "react-redux";

export default function Settings({ }) {
    const [count, setCount] = useState(undefined)
    const userData = useSelector((state) => state.userReducer)

    useEffect(() => {
        if (userData._id) {
            const request = requests.GetConfigCount
            .replace('{id}', userData._id)
            axios.get(request)
            .then((response) => {
                setCount(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [userData])

    const onSaveNumber = () => {
        const request = requests.UpdateConfigCount
        .replace('{id}', userData._id)
        axios.post(request, { 
            configCount: count,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="h-[600px]  w-[80%] bg-[#444444] rounded-xl shadow-lg">
                <div className="w-full h-full grid grid-cols-3 divide-x-1 p-5 gap-5">
                    <div className="flex flex-col items-center p-5 bg-[#3A3A3A] rounded-xl"> 
                        <h1 className="text-gray-300 text-3xl mb-10">Basics cryptos to show</h1>
                        <CryptoSelection profile={false} userData={userData}/>
                    </div>
                    <div className="flex flex-col items-center p-5 bg-[#3A3A3A] rounded-xl">
                        <h1 className="text-gray-300 text-3xl mb-10">Sources RSS</h1>
                        <p className="text-xl text-gray-300">All sources</p>
                    </div>
                    <div className="flex flex-col items-center p-5 bg-[#3A3A3A] rounded-xl">
                        <h1 className="text-gray-300 text-3xl mb-10">Configuration</h1>
                        <div className="w-full px-5">
                            <div className="flex justify-between items-center">
                                <p className="text-xl text-gray-300">News to display</p>
                               {count && <ArticleNumberButton onChange={(number) => setCount(number)} count={count}/>}
                            </div>
                            <button className="h-fit bg-[#686868] hover:opacity-50 mt-5 text-white font-bold w-full px-10 py-2 rounded-lg"
                                onClick={() => onSaveNumber()}>Save</button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}