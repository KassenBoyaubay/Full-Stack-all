const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())     // so that we can use json format
app.use(cors())             // whitelist your PC so that client can access server within same host 

const db = require('./models')

// Routers 
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    })
})