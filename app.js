const express = require('express')
const path = require('path')

const PORT = "8080"
const app = express()

app.get("/", (req, res) => {
    res.send({
        status: "online",
        port: PORT,
    })
})

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})