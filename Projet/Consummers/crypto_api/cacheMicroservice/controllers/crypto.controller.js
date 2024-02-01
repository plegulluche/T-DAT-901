const CryptoCoinDetailsModel = require('../models/cryptoCoinDetails.model');


const getAllTradingPairs = async (req, res) => {

    try {
        let cryptoCoinDetails = await CryptoCoinDetailsModel.find();
        let tradingPairs = [];
        cryptoCoinDetails.forEach(cryptoCoin => {
            cryptoCoin.tradingPairs.forEach(tradingPair => {
                tradingPairs.push(tradingPair.symbol);
            });
        });
        return tradingPairs;
    } catch (err) {
        console.log(err);
        return [];
    }
}

module.exports = { getAllTradingPairs };
    