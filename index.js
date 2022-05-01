// for hosting locally on node, quick testing because of CORS

let express = require("express")
let fs = require("fs/promises")
const app = express();

app.use(express.static(__dirname + "/hosting"));

app.listen(3000, console.log('hosting@~:3000'));