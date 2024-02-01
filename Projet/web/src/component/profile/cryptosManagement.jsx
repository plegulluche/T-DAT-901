import axios from "axios";
import Modal from "react-modal";
import { useState } from "react";
import requests from "../../api/Requests";
import { useEffect } from "react";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        backgroundColor: '#191919',
        borderRadius: 20,
        transform: 'translate(-50%, -50%)',
        borderColor: '#484848',
        borderWidth: 5
    },
}

function CryptoCard({crypto, adding=false, addNewCrypto, deleteCrypto}) {
    return (
        <div className="w-[300px] h-[45px] rounded-lg flex justify-between items-center px-5 bg-[#2E2E2E] hover:cursor-pointer hover:opacity-80 mb-3"
            onClick={() => adding ? addNewCrypto(crypto) : null}>
            <div className="flex items-center">
                <img src={crypto.logoUrl} className="w-[27px] h-[3 0px] mr-5"></img>
                <p className="text-gray-500 text-lg">{crypto.name}</p>
            </div>
            {adding ? <p className="text-gray-500 text-3xl mb-2">+</p> : <p className="text-gray-500 text-xl mb-1 text-red-500" onClick={() => deleteCrypto(crypto)}>x</p>}
        </div>
    )
}

export default function CryptoSelection({profile, userData}) {
    const [cryptoData, setCryptoData] = useState([])
    const [pages, setPages] = useState({next: '', prev: ''});
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
                setPages({next: response.data.pages[1], prev: response.data.pages[0]});
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, [newCrypto])

    function loadMore() {
        const request = requests.apiUrl + pages?.next.url;

        axios.get(request)
        .then((response) => {
            setCryptoData(response.data.cryptoCoins);
            setPages({next: response.data.pages[1], prev: response.data.pages[0]});
        })
        .catch((error) => {
            console.log(error);
        })
    }

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
                .then(() => {
                    setCryptos(cryptos.filter(el => el.name !== elem.name))
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            console.log(elem)
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
        <div>
            <div className={`${!profile ? 'max-h-[400px]' : 'max-h-[350px]'} overflow-y-auto`}>
                {cryptos.map(elem => <CryptoCard crypto={elem} deleteCrypto={(elem) => deleteCrypto(elem)} />)}
            </div>
            <div className="w-[300px] h-[35px] mt-3 border-2 border-dashed rounded-lg border-gray-600 flex items-center justify-center hover:bg-[#2E2E2E] hover:cursor-pointer"
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
                    {cryptoData.map(elem => <CryptoCard crypto={elem} adding={true} addNewCrypto={(elem) => addNewCrypto(elem)} />)}
                    <button className="px-3 py-2 w-full rounded-lg bg-[#545454] text-gray-300 hover:opacity-80" onClick={loadMore}>Load more</button>
                    <button className="px-3 py-2 w-full rounded-lg bg-[#68A165] mt-3 text-gray-300 hover:opacity-80"
                        onClick={() => setNewCrypto(false)}>Valider</button>
                </Modal>
            }
        </div>
    )
}