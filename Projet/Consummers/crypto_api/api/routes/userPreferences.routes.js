const router = require('express').Router();
const userPreferencesController = require("../controllers/userPreferences.controller");

//controller routes
router.get("/", 
    /*
        #swagger.path = "/user-preferences/"
        #swagger.summary = "Get all user preferences"
        #swagger.tags = ["User Preferences"]
    */
    userPreferencesController.getAll
);
router.get("/get-all-from-user/:id", 
    /*
        #swagger.path = "/user-preferences/get-all-from-user/{id}"
        #swagger.summary = "Get all user preferences from user id"
        #swagger.tags = ["User Preferences"]
    */
    userPreferencesController.getAllFromUser
);
router.post("/create-preference/", 
    /*
        #swagger.path = "/user-preferences/create-preference/"
        #swagger.summary = "Create a new user preference"
        #swagger.tags = ["User Preferences"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "User preference to create",
            required: true,
            type: "object",
            schema: {
                $userId: "string",
                $theme: "string",
                $language: "string"
            }
        }
    */
    userPreferencesController.createWithUserAndPreference
);

module.exports = router;