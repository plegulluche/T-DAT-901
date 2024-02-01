const router = require('express').Router();
const keywordsController = require("../controllers/keywords.controller");

//controller routes
router.get("/", 
    /*
        #swagger.path = "/keywords/"
        #swagger.summary = "Get all keywords"
        #swagger.tags = ["Keywords"]
    */
    keywordsController.getAll
);
router.get("/:id", 
    /*
        #swagger.path = "/keywords/{id}"
        #swagger.summary = "Get keyword by id"
        #swagger.tags = ["Keywords"]
    */
    keywordsController.getOne
);
router.get("/get-one-by-name/:name", 
    /*
        #swagger.path = "/keywords/get-one-by-name/{name}"
        #swagger.summary = "Get keyword by name"
        #swagger.tags = ["Keywords"]
    */
    keywordsController.getOneByName
);
router.post("/create", 
    /*
        #swagger.path = "/keywords/create"
        #swagger.summary = "Create a new keyword"
        #swagger.tags = ["Keywords"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Keyword to create",
            required: true,
            type: "object",
            schema: { $keyword: "string"}
        }
    */
    keywordsController.create
);
router.delete("/delete/:id", 
    /*
        #swagger.path = "/keywords/delete/{id}"
        #swagger.summary = "Delete keyword by id"
        #swagger.tags = ["Keywords"]
    */
    keywordsController.deleteById
);
router.delete("/delete-by-name/:name", 
    /*
        #swagger.path = "/keywords/delete-by-name/{name}"
        #swagger.summary = "Delete keyword by name"
        #swagger.tags = ["Keywords"]
    */

    keywordsController.deleteByName
);

module.exports = router;
