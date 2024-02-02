import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserContext } from "./UserContext";
import requests from "../api/Requests";
import axios from "axios";

export default function Navbar({}) {
    const [hover, setHover] = useState(window.location?.pathname)
    const userData = useSelector((state) => state.userReducer);
    const {getUser} = useUserContext()
    const [role, setRole] = useState('user')

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
        <div className="w-[80px] h-[80%] z-40 flex bg-[#171717] absolute left-0 top-[10%] hover:cursor-pointer hover:w-[220px] rounded-r-xl shadow-2xl drop-shadow-xl transition-width duration-300 truncate">
            <div className="h-full w-[80px] flex flex-col items-center">
                <Link to="/">
                    <img src="/logo2.png" className='w-[70px] h-[43px] mt-5' />
                </Link>
                {getUser() === 'connected' && <Link to="/profile" onClick={() => setHover('/profile')}>
                    {hover === '/profile' ? <img src="/user2.webp" className='w-[32px] h-[32px] mt-[60px]' />
                    : <img src="/user.webp" className='w-[32px] h-[32px] mt-[60px]' />}
                </Link>}
                <Link to="/cryptos" onClick={() => setHover('/cryptos')}>
                    {hover.includes('/cryptos') ? <img src="/crypto2.png" className='w-[52px] h-[52px] mt-[30px]' />
                    : <img src="/crypto.png" className='w-[52px] h-[52px] mt-[30px]' />}
                </Link>
                <Link to="/news" onClick={() => setHover('/news')}>
                    {hover === '/news' ? <img src="/news2.png" className='w-[52px] h-[52px] mt-[30px]' />
                    : <img src="/news.png" className='w-[52px] h-[52px] mt-[30px]' />}
                </Link>
                {(getUser() === 'connected' && role === 'admin') && <Link to="/settings" onClick={() => setHover('/settings')}>
                    {hover === '/settings' ? <img src="/settings2.png" className='w-[30px] h-[30px] mt-[40px]' />
                    : <img src="/settings.png" className='w-[30px] h-[30px] mt-[40px]' />}
                </Link>}
            </div>
            <div className="h-[120px] w-fit flex flex-col items-center absolute left-20">
                <div className="flex flex-col items-start mt-[25px]">
                    <p className={`text-[22px] text-orange-400 font-bold ${getUser() === 'connected' ? 'mb-[68px]' : 'mb-[50px]'}`}>T-DAT</p>
                    {getUser() === 'connected' && <Link to="/profile" onClick={() => setHover('/profile')}>
                        <p className={`text-[20px] ${hover !== '/profile' ? "text-[#7d7d7d]" : "text-[#c18936]"} font-bold mb-[45px]`}>Profile</p>
                    </Link>}
                    <Link to="/cryptos" onClick={() => setHover('/cryptos')}>
                        <p className={`text-[20px] ${!hover.includes('/cryptos') ? "text-[#7d7d7d]" : "text-[#c18936]"} font-bold mb-[45px]`}>Cryptos</p>
                    </Link>
                    <Link to="/news" onClick={() => setHover('/news')}>
                        <p className={`text-[20px] ${hover !== '/news' ? "text-[#7d7d7d]" : "text-[#c18936]"} font-bold mb-[53px]`}>News</p>
                    </Link>
                    {(getUser() === 'connected' && role === 'admin') && <Link to="/settings" onClick={() => setHover('/settings')}>
                        <p className={`text-[20px] ${hover !== '/settings' ? "text-[#7d7d7d]" : "text-[#c18936]"} font-bold`}>Settings</p>
                    </Link>}
                </div>
            </div>
        </div>
    )
}