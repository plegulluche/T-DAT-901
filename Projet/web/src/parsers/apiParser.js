
///API  GET /api/v3/trades 
// [
//     {
//       "id": 28457,
//       "price": "4.00000100",
//       "qty": "12.00000000",
//       "quoteQty": "48.000012",
//       "time": 1499865549590,
//       "isBuyerMaker": true,
//       "isBestMatch": true
//     }
//   ]

function tradesParser(data) {
    const parsedData = {
        id: data.id,
        price: data.price,
        quantity: data.qty,
        quoteQuantity: data.quoteQty,
        time: data.time,
        isBuyerMaker: data.isBuyerMaker,
        isBestMatch: data.isBestMatch
    }
    return parsedData;
}

function tradeTypeApiParser(data, tradeType) {
    const jsonData = data[0];
    switch (tradeType) {
        case '/api/v3/trades':
            return tradesParser(jsonData);
        default:
            return jsonData;
    }
}

module.exports = tradeTypeApiParser;