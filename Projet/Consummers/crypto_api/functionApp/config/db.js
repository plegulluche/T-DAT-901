//env
const mongoose = require("mongoose");

mongoose.connect(
    process.env.ATLAS_URI + process.env.DB_NAME,
    {useNewUrlParser: true, useUnifiedTopology: true,}
).then(() => console.log('connected to mongodb'))
.catch((err) => console.log('Failed to connect mongodb', err));