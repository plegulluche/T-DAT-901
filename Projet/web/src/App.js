import React, { useEffect, useState } from "react";
import './App.css';

import Navbar from './component/Navbar';
import Homepage from './pages/Homepage';
import { Outlet } from "react-router-dom";
import Route from './routes';
import axios from "axios";
import { useDispatch } from "react-redux";
import { UidContext } from "./component/AppContext";
import { getUser } from "./redux/actions/user.actions";
import './chart.less'
import {UserContext} from './component/UserContext'

function Layout({}) {
  return (
    <div className='bg-[#252525] flex flex-row '>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);


  return (
    <UidContext.Provider value={uid}>
      <UserContext>
        <Route/>
      </UserContext>
    </UidContext.Provider>
  );
}
