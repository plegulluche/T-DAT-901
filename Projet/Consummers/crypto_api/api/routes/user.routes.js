const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const userController = require("../controllers/user.controller");

//#swagger.tags = ['Users']

router.get("/",
    /*  
        #swagger.path = "/user/"
        #swagger.summary = "Get all users" 
        #swagger.tags = ['Users']
    */
    userController.getAll
);
router.get("/:id",
     /* 
        #swagger.path = "/user/{id}"
        #swagger.summary = "Get user by id"
        #swagger.tags = ["Users"]
     */
    userController.getOne
);

router.get("/count/:id",
    userController.getUserConfigCount
);

router.get("/get-user-roles/:id",
    /*
        #swagger.path = "/user/get-user-roles/{id}"
        #swagger.summary = "Get user roles by user id"
        #swagger.tags = ["Users"]
    */
    userController.getUserRoles
);

router.post("/count/:id",
    UserController.updateConfigCount
);

router.post("/add-user-roles/:id", 
    /*
        #swagger.path = "/user/add-user-roles/{id}"
        #swagger.summary = "Add user roles by user id"
        #swagger.tags = ["Users"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "User roles to add",
            required: true,
            type: "array",
            schema: { 
                $roles: ["string"]
             }
        }
    */
    userController.addUserRoles
);

router.post("/remove-user-roles/:id", 
    /*
        #swagger.path = "/user/remove-user-roles/{id}"
        #swagger.summary = "Remove user roles by user id"
        #swagger.tags = ["Users"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "User roles to remove",
            required: true,
            type: "array",
            schema: {
                $roles: ["string"]
            }
        }
    */
    userController.removeUserRoles
);

module.exports = router;