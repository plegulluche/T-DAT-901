import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserContext } from "./UserContext";
import requests from "../api/Requests";
import axios from "axios";
import { Dashboard, List, RssFeed, RssFeedTag, User } from "iconoir-react";

export default function Navbar({}) {
    const [hover, setHover] = useState(window.location?.pathname)
    const userData = useSelector((state) => state.userReducer);
    const navigate  =useNavigate()
    const {getUser} = useUserContext()
    const [role, setRole] = useState('user')
    const [selected, setSelected] = useState("dashboard")

    useEffect( () => {
        if (userData._id) {
            const request = requests.GetUserRole
            .replace('{id}', userData._id)
                axios.get(request)
            .then((response) => {
                setRole(response.data.description)
            })
            .catch((error) => {
                console.log(error);
                setRole(null)
            })
        }
    }, [userData])

    return (
        <div className="flex flex-col w-[80px] h-[80%] z-40 flex bg-[#232323] border-r border-b border-t border-gray-500/50 absolute left-0 top-[10%] hover:cursor-pointer hover:w-[220px] rounded-r-xl shadow-2xl drop-shadow-xl transition-width duration-300 truncate">
                <div className="flex gap-6 items-center mb-8 mt-12 ml-4">
                    <img src="/logo2.png" width={40} height={40}/>
                    <p className="text-gray-200 font-bold text-[17px] italic">Bousti<span className="text-purple-400">Crypto</span></p>
                </div>
            <div className="h-full py-10 px-6 w-fit flex flex-col gap-12">
                   <div className={`flex gap-6 items-center ${selected === 'dashboard' ? "text-purple-500 font-bold" : "text-white font-normal"}`} onClick={() =>{ setSelected("dashboard"); navigate("/cryptos")}}>
                        <List width={32} height={32} strokeWidth={2.2}/>
                        <p className="text-xl">Dashboard</p>
                   </div>
                   <div className={`flex gap-6 items-center ${selected === 'profile' ? "text-purple-500 font-bold" : "text-white font-normal"}`} onClick={() =>{ setSelected("profile"); navigate("/profile")}}>
                        <User width={32} height={32} strokeWidth={2}/>
                        <p className="text-xl">Profile</p>
                   </div>
                   <div className={`flex gap-6 items-center ${selected === 'news' ? "text-purple-500 font-bold" : "text-white font-normal"}`} onClick={() =>{ setSelected("news"); navigate("/news")}}>
                        <RssFeedTag width={32} height={32} strokeWidth={2}/>
                        <p className="text-xl">News</p>
                   </div>
                    
            </div>
        </div>
    )
}