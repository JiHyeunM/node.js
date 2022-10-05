const express = require ("express");
const app = express();
const port = 3000;
const connect = require("./schemas/index");
const postsRouter = require("./routes/index"); //./상대경로
const commentRouter = require("./routes/index");

connect();

app.use(express.json())

app.use(postsRouter)
app.use(commentRouter)

app.listen(port, ()=>{
    console.log(port, '포트로 서버가 열렸어요')
})
