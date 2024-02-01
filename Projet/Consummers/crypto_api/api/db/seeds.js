const mongoose = require("mongoose");
const RoleModel = require("../models/role.model");

mongoose.connect(
    process.env.ATLAS_URI + process.env.DB_NAME,
    {useNewUrlParser: true, useUnifiedTopology: true,}
).then(
    () => console.log('connected to mongodb')
).catch(
    (err) => console.log('Failed to connect mongodb', err)
);

const seedRoles = [
    {description: "user"},
    {description: "admin"},
    {description: "moderator"},
]

const seedDB = async () => {
    await RoleModel.deleteMany({});
    await RoleModel.insertMany(seedRoles);
    console.log("DB seeded");
}

seedDB().then(() => {
    mongoose.connection.close();
});