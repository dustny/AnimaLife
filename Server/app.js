if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
  }

const express = require('express')
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer)
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(require("./routes"))

io.on("connection", (socket) => {
  console.log("user connected")
});



httpServer.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})