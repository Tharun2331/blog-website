const express = require("express");
const articleRouter = require("./routes/articles")
const methodOverride = require('method-override')
const app = express();
const mongoose = require("mongoose")
const Article = require("./models/articles")
app.set("view engine", "ejs" )
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use("/articles",articleRouter)

mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true
})
app.get("/",async(req,res) => {
    const articles = await Article.find().sort({createdAt:'desc'}) 
    res.render("articles/index",{articles: articles})
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server is runnig on 3000")
})