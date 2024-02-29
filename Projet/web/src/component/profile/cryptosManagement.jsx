import axios from "axios";
import Modal from "react-modal";
import { useState } from "react";
import requests from "../../api/Requests";
import { useEffect } from "react";

const customStyles = {
    content: {
        top: '50%',
        left: '60%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        backgroundColor: '#191919',
        borderRadius: 10,
        transform: 'translate(-50%, -50%)',
        borderColor: '#484848',
        borderWidth: 3,
        width: 600
    },
}

function CryptoCard({crypto, adding=false, addNewCrypto, deleteCrypto}) {
    return (
        <div className="col-span-1 w-full h-[58px] min-h-[58px] rounded-lg flex justify-between items-center px-5 bg-[#373737] hover:cursor-pointer hover:opacity-80"
            onClick={() => adding ? addNewCrypto(crypto) : null}>
            <div className="flex items-center">
                <img src={crypto.logoUrl} className="w-[28px] h-[3 0px] mr-5"></img>
                <div className="flex flex-col">
                    <p className="text-gray-300 text-base font-semibold">{crypto.name}</p>
                    <p className="text-gray-300/50 text-xs">{crypto.symbol}</p>
                </div>
            </div>
            {adding ? <p className="text-gray-500 text-3xl mb-2">+</p> : <p className="text-gray-500 text-xl mb-1 text-red-500" onClick={() => deleteCrypto(crypto)}>x</p>}
        </div>
    )
}

export default function CryptoSelection({profile, userData}) {
    const [cryptoData, setCryptoData] = useState([])
    const [newCrypto, setNewCrypto] = useState(false)
    const [cryptos, setCryptos] = useState([]) //need to be store in database

    useEffect(() => {
        if (userData) {
            if (profile) {
                const request = requests.GetUserCryptoListByUserId
                .replace('{id}', userData._id)
                axios.get(request)
                .then((response) => {
                    setCryptos(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            else {
                const request = requests.GetAllPopularCryptoCoins
                axios.get(request)
                .then((response) => {
                    setCryptos(response.data)
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        }
    }, [userData])

    useEffect(() => {
        if (newCrypto) {
            const request = requests.GetAllCryptoCoins
            .replace('{sort}', 'marketCap')
            .replace('{filter}', 'descending')
            .replace('{page}', 1)
            .replace('{limit}', 10);


            axios.get(request)
            .then((response) => {
                setCryptoData(response.data.cryptoCoins);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [newCrypto])



    const addNewCrypto = (elem) => {
        if (cryptos.filter(el => el.name === elem.name).length > 0) return
        if (profile) {
            const request = requests.PostUserCryptoListByUserId
            .replace('{userId}', userData._id)
            .replace('{cryptoId}', elem._id)
            axios.post(request)
            .then(() => {
                setCryptos([...cryptos, elem])
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            const request = requests.PostPopularCrypto
            axios.post(request, {cryptoId: elem._id})
            .then(() => {
                setCryptos([...cryptos, elem])
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
    }

    const deleteCrypto = (elem) => {
        if (profile) {
            const request = requests.DeleteUserCryptoListByUserId
                .replace('{id}', elem._id)
                axios.delete(request)
                .then((e) => {
                    console.log(e)
                    if (e.data)
                    setCryptos(cryptos.filter(el => el.name !== elem.name))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            const request = requests.DeletePopularCryptoById
                .replace('{id}', elem._id)
                axios.delete(request)
                .then(() => {
                    setCryptos(cryptos.filter(el => el.name !== elem.name))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div className="">
            <div className={`${!profile ? 'max-h-[400px]' : 'max-h-[360px]'} overflow-y-auto pr-5 flex flex-col gap-3`}>
                {cryptos.map(elem => <CryptoCard crypto={elem} deleteCrypto={(elem) => deleteCrypto(elem)} />)}
            </div>
            <div className="w-[350px] h-[35px] mt-5 border-2 border-dashed rounded-lg border-gray-500 flex items-center justify-center hover:cursor-pointer hover:opacity-80"
                onClick={() => setNewCrypto(!newCrypto)}>
                <p className="text-gray-500 text-2xl mb-2">+</p>
            </div>
            {newCrypto && 
                <Modal
                    isOpen={newCrypto}
                    onRequestClose={() => setNewCrypto(false)}
                    style={customStyles}
                    contentLabel="Example Modal"
                    overlayClassName="modal-overlay"
                >
                    <p className="text-white text-lg mb-5">Select your favorites cryptos</p>
                    <div className="grid grid-cols-2 gap-4">
                    {cryptoData.filter(ell => !cryptos.map(el => el._id).includes(ell._id)).map(elem => <CryptoCard crypto={elem} adding={true} addNewCrypto={(elem) => addNewCrypto(elem)} />)}
                    </div>
                    <button className="px-3 py-2 w-full rounded-lg bg-[#68A165] mt-3 text-gray-300 hover:opacity-80"
                        onClick={() => setNewCrypto(false)}>Valider</button>
                </Modal>
            }
        </div>
    )
}