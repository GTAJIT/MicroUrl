const express = require('express')
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRoutes')
const app = express()
const PORT = 3000
const {dbConnect} = require('./dbConnect')
const URL = require('./models/url')
const { handleRedirect } = require('./controllers/url')
const path = require('path')

require('dotenv').config()

const dburl = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/urlShorter";

//connect
dbConnect(dburl).then(() => {
    console.log("201 - db Connected")
}).catch((err) => {
    console.log("500 - something went wrong - ",err )
});

app.set("view engine", 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/", staticRoute)
app.use("/url", urlRoute)
app.route("/:shortId").get(handleRedirect)

app.listen(PORT, ()=>console.log(`server started at port: ${PORT}`))