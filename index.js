const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const ecstatic = require('ecstatic');
const app = express();
const port = 5579;
// app.use(cors({
//     origin:"*"
// }));
app.use(bodyParser.json());

app.post(/api/,async (res,req)=>{
    req.status(200)
    const result = await findResult(res.body);
    req.send(result);
})
app.use(ecstatic({ root: __dirname + '/dist',cache:'no-cache',weakEtags:true}));
app.listen(port,(err)=>{
    if(err)console.log(err);
    console.log(`http://127.0.0.1:${port}`);
});

async function findResult({
    prompt="js编写快速排序"
}){
    const {data:[{text}]} = await axios.post("https://ai.bln.cn/api/text",{
        prompt
    });
    return {choices:[{text}]}
} 