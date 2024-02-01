import React, { useState, useEffect, useRef } from "react";
import { websocketConnectMulti, websocketConnect } from '../api/websocket/binance.WEBSOCKET.connector';
import Draggable from 'react-draggable'
import '../css/WebsocketGraphic.scss'
import KlineChart from "./KlineChart";
import CryptoBadge from "./CryptoBadge";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        //zindex
    },
};

export default function WebsocketGraphic(props) {
    const { symbols, tradeType } = props;
    const [websocketData, setWebsocketData] = useState([]);
    const [websocketDataAggregation, setWebsocketDataAggregation] = useState('');
    const [hasConnected, setHasConnected] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [klineSymbol, setKlineSymbol] = useState('');
    const websocketTerminate = useRef(null);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        customStyles.zIndex = '100';
      }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        const constructedObject = { ...websocketDataAggregation }
        Object.keys(constructedObject).forEach(key => key === 'undefined' && delete constructedObject[key])
        websocketData && websocketData.forEach(elem => { constructedObject[elem?.symbol] = elem; })
        setWebsocketDataAggregation(constructedObject);
    }, [websocketData]);

    useEffect(() => {
        websocketTerminate.current = websocketConnectMulti(symbols, tradeType, setHasConnected, setWebsocketData);
        return () => {
            websocketTerminate.current();
        }
    }, [symbols]);
    return (
        <div className="w-full">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                overlayClassName="modal-overlay"
            >
                <KlineChart symbols={klineSymbol}/>
            </Modal>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 2xl:grid-cols-4 gap-5 z-20 w-full">
                {symbols?.map((symbol, index) => {
                    return (
                        <div onClick={() => {openModal(); setKlineSymbol(symbol)}}>
                            <CryptoBadge symbol={symbol} index={index} websocketDataAggregation={websocketDataAggregation} />
                        </div>
                    )
                })}
            </div>
    </div>
    )
}