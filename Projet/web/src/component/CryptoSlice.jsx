import "../css/CryptoSlice.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function CryptoSlice(props) {
    const { name, symbol, logoUrl, id } = props;
    console.log()
    return (
        <div>
            <Link to={`/crypto/${id}`}>
                <div className="w-full h-[200px] hover:bg-[#414141] shadow-xl flex flex-col items-center p-5 rounded-lg justify-between bg-[#3A3A3A]">
                    <div className="flex flex-col items-center gap-5">
                        <img className="w-[70px] h-[70px]" src={logoUrl} />
                        <p className="text-gray-300 text-center text-xl">{name}</p>
                    </div>
                    <p className="text-gray-500 text-md">{symbol}</p>
                </div>
            </Link>
        </div>

    )
}