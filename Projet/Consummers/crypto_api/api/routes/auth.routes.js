const router = require('express').Router();
const authController = require("../controllers/auth.controllers");

//auth
router.post("/register", 
    /*
        #swagger.path = "/auth/register"
        #swagger.summary = "Register a new user"
        #swagger.tags = ["Auth"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "User to register",
            required: true,
            type: "object",
            schema: { $username: "string", $email: "string", $password: "string" }
        }
    */
    authController.signUp
);
router.post("/login", 
    /*
        #swagger.path = "/auth/login"
        #swagger.summary = "Login a user"
        #swagger.tags = ["Auth"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "User to login",
            required: true,
            type: "object",
            schema: { $email: "string", $password: "string" }
        }
    */
    authController.signIn
);
router.get("/logout", 
    /*
        #swagger.path = "/auth/logout"
        #swagger.summary = "Logout a user"
        #swagger.tags = ["Auth"]
    */
    authController.signOut
);

module.exports = router;