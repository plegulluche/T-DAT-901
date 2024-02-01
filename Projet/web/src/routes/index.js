import React, { useContext } from 'react';
import { UidContext } from "../component/AppContext";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from '../component/Navbar';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import CryptoMain from '../pages/CryptoMain';
import CryptoDetails from '../pages/CryptoDetails';
import News from '../pages/News';
import Settings from '../pages/Settings';
import Register from '../pages/Register';
import { Outlet } from "react-router-dom";
import { useUserContext } from '../component/UserContext';
import ConnectButton from '../component/ConnectButton';

function Layout({}) {
    return (
      <div className='bg-[#252525] w-full'>
        <Navbar />
        <ConnectButton />
        <Outlet />
      </div>
    )
}
function Restricted ({element}) {
    const {getUser} = useUserContext()
    if (getUser() === 'connected') {
        return <div>
            {element}
        </div>
    } else 
    return <Navigate to="/auth/login" />;

}

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Navigate to ='cryptos'/>} />
                    <Route path="cryptos" element={<CryptoMain />} />
                    <Route path="news" element={<News />} />
                    <Route path="profile" element={<Restricted element={<Profile />}/>}/>
                    <Route path="settings" element={<Restricted element={<Settings />}/>}/>
                    <Route path="crypto/:cryptoId" element={<CryptoDetails />} />
                </Route>
                <Route path="auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default index;