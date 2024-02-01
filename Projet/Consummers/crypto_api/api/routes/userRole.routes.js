const router = require('express').Router();
const UserRoleController = require("../controllers/userRole.controller.js");

//controller routes
router.get("/", 
    /*
        #swagger.path = "/user-preferences/"
        #swagger.summary = "Get all user preferences"
        #swagger.tags = ["User Preferences"]
    */
        UserRoleController.getAll
);
router.get("/get-role-from-user/:id", 
    /*
        #swagger.path = "/user-preferences/get-all-from-user/{id}"
        #swagger.summary = "Get all user preferences from user id"
        #swagger.tags = ["User Preferences"]
    */
        UserRoleController.getOneByUserId
);
module.exports = router;