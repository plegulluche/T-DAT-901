const router = require("express").Router();
const TestController = require("../controllers/test.controllers");

router.get("/test-performance",
    /*
        #swagger.path = "/test/test-performance"
        #swagger.summary = "Test performance"
        #swagger.tags = ["Test performance"]
    */
        TestController.performanceTest
);

module.exports = router;