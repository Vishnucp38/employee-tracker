const express = require('express');
const cors = require('cors');

const empRouter = require("./routes/employee");
const app = express();
 
app.use(cors());

//to parse request body to json
app.use(express.json());

app.use("/emp", empRouter);

const start = ({ port, callback }) => app.listen(port, callback);

module.exports = { start };