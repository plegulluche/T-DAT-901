const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const cryptoCoinDetailsModel = require('./cryptoCoinDetails.model');

const cryptoCoinsSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            minLength: 1,
            maxLenght: 50,
            unique: false,
            trim: true
        },
        symbol: {
            type: String,
            require: true,
            minLength: 1,
            maxLenght: 50,
            unique: true,
            trim: true
        },
        logoUrl: {
            type: String,
            require: false,
            maxLenght: 500,
            unique: false,
            trim: true
        },
        marketCap: {
            type: Number,
            require: false,
            minLength: 2,
            maxLenght: 40,
            unique: false,
            trim: true
        },
        totalSupply: {
            type: Number,
            require: false,
            minLength: 2,
            maxLenght: 40,
            unique: false,
            trim: true
        },
        circulatingSupply: {
            type: Number,
            require: false,
            minLength: 2,
            maxLenght: 40,
            unique: false,
            trim: true
        },
    },
    {
        timestamps: true,
    }
);



cryptoCoinsSchema.statics.parseDataAndUpdate = async function (data) {
    //get all crypto coins from db
    const cryptoCoins = await this.find();

    // loop through all crypto coins from api except cryptoCoins from db
    for (let i = 0; i < data.length; i++) {
        //if crypto coin from api is not equal to crypto coin from db
        if (!cryptoCoins.find(cryptoCoin => cryptoCoin.symbol === data[i].assetCode)) {
            //create new crypto coin in db
            await this.create({
                name: data[i].assetName,
                symbol: data[i].assetCode,
                logoUrl: data[i].logoUrl
            });
        } else
        {
            await this.updateOne({ _id: cryptoCoins[i]._id }, {
                $set: {
                    name: data[i].assetName,
                    symbol: data[i].assetCode,
                    logoUrl: data[i].logoUrl
                }
            });
        }
    }
 
}

cryptoCoinsSchema.statics.coinCreateDetails = async function (coin, details) {
    //get coin from db
    const cryptoCoin = await this.findOne({ _id: coin._id });
    //get details from db if exist
    const cryptoCoinDetails = await cryptoCoinDetailsModel.findOne({ cryptoCoin: cryptoCoin._id });
    //create details for coin
    if (!cryptoCoinDetails) {
        await cryptoCoinDetailsModel.create({
            description: details?.details[1]?.description ?? '',
            links: details.explorerUrls ?? '',   
            marketCap: details.marketCap ?? '',
            totalSupply: details.totalSupply ?? '',
            circulatingSupply: details.circulatingSupply ?? '',
            cryptoCoin: cryptoCoin._id
        });
    } else {
        //update details for coin if all fields different
        if (cryptoCoinDetails?.description !== details?.details[1]?.description ||
            cryptoCoinDetails?.links !== details?.links ||
            cryptoCoinDetails?.marketCap !== details?.marketCap ||
            cryptoCoinDetails?.totalSupply !== details?.totalSupply ||
            cryptoCoinDetails?.circulatingSupply !== details?.circulatingSupply) {
            await cryptoCoinDetailsModel.updateOne({ _id: cryptoCoinDetails._id }, {
                $set: {
                    description: details?.details[1]?.description ?? '',
                    links: details.explorerUrls ?? '',   
                    marketCap: details.marketCap ?? '',
                    totalSupply: details.totalSupply ?? '',
                    circulatingSupply: details.circulatingSupply ?? '',
                    cryptoCoin: cryptoCoin._id
                }
            });
        }
    }
}

cryptoCoinsSchema.statics.getCoinLogoUrlsAndUpload = async function (download, upload) {
    //get all crypto coins from db
    const cryptoCoins = await this.find();
    //loop through all crypto coins
    for (let i = 0; i < cryptoCoins.length; i++) {
        //if logoUrl is not empty
        if (cryptoCoins[i].logoUrl) {
            //get logoUrl from db
            const logoUrl = cryptoCoins[i].logoUrl;

            if(logoUrl.includes('bnbstatic')) {

            //get logoUrl from api
            const logoUrlApi = await download(logoUrl);

            //if logoUrlApi is not empty
                if (logoUrlApi) {
                    //upload logoUrl from api to cloudinary
                    const {blobPromise, blobName} = upload(logoUrlApi, cryptoCoins[i].symbol);
                    const logoUploaded = await blobPromise;
                    //update logoUrl in db
                    console.log(logoUploaded);
                    await this.updateOne({ _id: cryptoCoins[i]._id }, {
                        $set: {
                            logoUrl: process.env.AZURE_STORAGE_CONTAINER_URL + blobName
                        }
                    });
                }
            }
        }
    }
}
const CryptoCoinsModel = model("CryptoCoins", cryptoCoinsSchema);


module.exports = CryptoCoinsModel;