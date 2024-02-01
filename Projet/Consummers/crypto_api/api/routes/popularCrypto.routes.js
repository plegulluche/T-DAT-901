const router = require('express').Router();
const popularCryptoController = require("../controllers/popularCrypto.controller");

//controller routes with swagger documentation

router.get("/",
    /*
        #swagger.path = "/popular-crypto/"
        #swagger.summary = "Get all popular cryptos"
        #swagger.tags = ["Popular Crypto"]
    */
    popularCryptoController.getAll
);
router.post("/create",
    /*
        #swagger.path = "/popular-crypto/create"
        #swagger.summary = "Create a new popular crypto"
        #swagger.tags = ["Popular Crypto"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Popular crypto to create",
            required: true,
            type: "object",
            schema: { $cryptoId: "string"}
        }
    */
    popularCryptoController.create
);
router.delete("/delete-by-id/:id",
    /*
        #swagger.path = "/popular-crypto/delete-by-id/{popularCryptoId}"
        #swagger.summary = "Delete a popular crypto by cryptoId"
        #swagger.tags = ["Popular Crypto"]
    */
    popularCryptoController.delete
);

router.get("/get-popular-trading-pairs",
    /*
        #swagger.path = "/popular-crypto/get-popular-trading-pairs"
        #swagger.summary = "Get all popular trading pairs"
        #swagger.tags = ["Popular Crypto"]
    */
    popularCryptoController.getPopularTradingPairs
);

module.exports = router;