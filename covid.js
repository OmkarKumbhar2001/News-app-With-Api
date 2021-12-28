const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
let userSearchdata="";
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", function (req, res) {
    const url = ("https://newsapi.org/v2/top-headlines?country=in&apiKey=/youapi key goes here/sortBy=publishedAt")
    let chunks = [];
    https.get(url, function (response) {
        // console.log(response.statusCode)
        response.on("data", function (data) {
            chunks.push(data);
        }).on('end', function () {
            let data = Buffer.concat(chunks);
            let schema = JSON.parse(data);
            let articalDailys=schema.articles;
            res.render("index",{articals:articalDailys})
        });
    })
});
app.get("/search", function (req, res) {
    const url = ("https://newsapi.org/v2/everything?sortBy=publishedAt&language=en&q="+userSearchdata+"&apiKey=/youapi key goes here/")
    let chunks = [];
    https.get(url, function (response) {
        // console.log(response.statusCode)
        response.on("data", function (data) {
            chunks.push(data);
        }).on('end', function () {
            let data = Buffer.concat(chunks);
            let schema = JSON.parse(data);
            let articalDailys=schema.articles;
            res.render("index", {articals:articalDailys})
        });
    })
});
app.get("/news/:topic",function(req,res){
    let userchosencategory=req.params.topic;
    console.log("style code "+userchosencategory)
    const url = ("https://newsapi.org/v2/everything?sortBy=publishedAt&language=en&q="+userchosencategory+"&apiKey=/youapi key goes here/")
    let chunks = [];
    https.get(url, function (response) {
        response.on("data", function (data) {
            chunks.push(data);
        }).on('end', function () {
            let data = Buffer.concat(chunks);
            let schema = JSON.parse(data);
            let articalDailys=schema.articles;
            res.render("news", {articals:articalDailys})
        });
    })
});
app.post("/search",function(req,res){
    var userSearch=req.body.UserSearch;
    userSearchdata=userSearch;
    res.redirect("/search")
});
app.get("/About",function(req,res){
    res.render("About")
})
app.listen(process.env.PORT || 3000, function () {
    console.log("server started at point 3000")
});