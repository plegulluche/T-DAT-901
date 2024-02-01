const PopularCryptoModel = require('../models/popularCrypto.model');
const CryptoCoinDetailsModel = require('../models/cryptoCoinDetails.model');
const {popularCryptoEmitter} = require('../events/centralizedEvents');


const getTradingPairs = async (req, res) => {
    try {
        let popularCryptos = await PopularCryptoModel.find();
        let cryptoTradingPairs = [];
        for (let i = 0; i < popularCryptos.length; i++) {
            let cryptoDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: popularCryptos[i].cryptoCoin });
            cryptoDetails.tradingPairs.forEach(tradingPair => {
                cryptoTradingPairs.push(tradingPair.symbol);
            });
        }
        return cryptoTradingPairs;
    } catch (err) {
        console.log(err);
        return [];
    }
}

const listenForPopularCryptoChangesAndGetTradingPairs = async () => {
    PopularCryptoModel.watch().on('change', async () => {
        let cryptoTradingPairs = await getTradingPairs();
        popularCryptoEmitter.emit('popularCryptoChange', cryptoTradingPairs);
        console.log('popularCryptoChange');
    });
}

module.exports = { listenForPopularCryptoChangesAndGetTradingPairs, getTradingPairs};