const router = require('express').Router();
const userKeywordsController = require("../controllers/userKeywords.controller");

//controller routes
router.get("/", 
    /*
        #swagger.path = "/user-keywords/"
        #swagger.summary = "Get all user keywords"
        #swagger.tags = ["User Keywords"]
    */
    userKeywordsController.getAll
);
router.get("/get-all-from-user/:id", 
    /*
        #swagger.path = "/user-keywords/get-all-from-user/{id}"
        #swagger.summary = "Get all user keywords from user id"
        #swagger.tags = ["User Keywords"]
    */
    userKeywordsController.getAllFromUser
);
router.get("/get-all-by-keyword/:id", 
    /*
        #swagger.path = "/user-keywords/get-all-by-keyword/{id}"
        #swagger.summary = "Get all user keywords from keyword id"
        #swagger.tags = ["User Keywords"]
    */
    userKeywordsController.getAllByKeyword
);
router.post("/add-user-keyword/:userId/:keywordId", 
    /*
        #swagger.path = "/user-keywords/add-user-keyword/"
        #swagger.summary = "Add a new user keyword"
        #swagger.tags = ["User Keywords"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "User keyword to add",
            required: true,
            type: "object",
            schema: {
                $userId: "string",
                $keywordId: "string"
            }
        }
    */
    userKeywordsController.createWithUserAndKeyword
);
router.delete("/delete-by-id/:id", 
    /*
        #swagger.path = "/user-keywords/delete-by-id/{id}"
        #swagger.summary = "Delete a user keyword by id"
        #swagger.tags = ["User Keywords"]
    */
    userKeywordsController.deleteById
);
router.delete("/delete-by-name/:name", 
    /*
        #swagger.path = "/user-keywords/delete-by-name/{name}"
        #swagger.summary = "Delete a user keyword by name"
        #swagger.tags = ["User Keywords"]
    */
    userKeywordsController.deleteByName
);
router.delete("/delete-all-from-user/:id", 
    /*
        #swagger.path = "/user-keywords/delete-all-from-user/{id}"
        #swagger.summary = "Delete all user keywords from user id"
        #swagger.tags = ["User Keywords"]
    */
    userKeywordsController.deleteAllFromUser
);

module.exports = router;
