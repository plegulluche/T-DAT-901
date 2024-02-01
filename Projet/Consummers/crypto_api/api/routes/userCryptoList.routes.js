const router = require('express').Router();
const userCryptoListController = require("../controllers/userCryptoList.controller");

//controller routes with swagger documentation
router.get("/",
    /*
        #swagger.path = "/user-crypto-list/"
        #swagger.summary = "Get all user cryptos"
        #swagger.tags = ["User Crypto List"]
    */
    userCryptoListController.getAll
);
router.get("/:id",
    /*
        #swagger.path = "/user-crypto-list/{id}"
        #swagger.summary = "Get user crypto list by id"
        #swagger.tags = ["User Crypto List"]
    */
    userCryptoListController.getOne
);
router.get("/get-all-from-user/:id",
    /*
        #swagger.path = "/user-crypto-list/get-all-from-user/{id}"
        #swagger.summary = "Get all user cryptos from user id"
        #swagger.tags = ["User Crypto List"]
    */
    userCryptoListController.getAllFromUser
);
router.post("/:userId/:cryptoId",
    /*
        #swagger.path = "/user-crypto-list/add-crypto-to-user/"
        #swagger.summary = "Add crypto to user crypto list"
        #swagger.tags = ["User Crypto List"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "User crypto list to add",
            required: true,
            type: "object",
            schema: {
                $userId: "string",
                $cryptoId: "string"
            }
        }
    */
    userCryptoListController.createWithUserAndCrypto
);
router.delete("/delete-by-id/:id",
    /*
        #swagger.path = "/user-crypto-list/delete-by-id/{id}"
        #swagger.summary = "Delete a user crypto by id"
        #swagger.tags = ["User Crypto List"]
    */
    userCryptoListController.deleteById
);
router.delete("/delete-by-name/:name",
    /*
        #swagger.path = "/user-crypto-list/delete-by-name/{name}"
        #swagger.summary = "Delete a user crypto by name"
        #swagger.tags = ["User Crypto List"]
    */
    userCryptoListController.deleteByName
);

module.exports = router;
