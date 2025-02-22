const express = require("express");

const cors  = require("cors");

const env = require('dotenv').config();


const port = process.env.HTTP_PORT |  3000;
const host = process.env.HTTP_HOST | "localhost";


const medRouter = require('./routes/med.routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static("public"));
console.log("SSR at public folder is working");

app.use("/api/medicines", medRouter);

app.get("/", (req, res)=> {
    res.send("<h1>Welcome to Medicine_Store</h1>");
});

app.listen(port, host, ()=> {
    console.log(`Express server has started at http://${host}:${port}`);
})







