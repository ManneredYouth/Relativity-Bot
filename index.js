// Requires
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require('dotenv').config();
const {messageHandler} = require('./commands')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MessageModel = require('./models/message')


// Database
mongoose.connect(process.env.MONGO, () => {
console.log("Database connected...")
  }, {
    keepAlive: true
  })

// Discord.js
client.on('ready', async () => {
  console.log("Client connected...")
})
  
client.on('message', messageHandler)


// Web Server
app.listen(8080, () => {
  console.log("Web server initiated...")
})

app.get("/", (req, res) => {
  // res.send("Web server working...")

  MessageModel.find({}, (err, result) => {
    if (err) {
        res.json(err)
    } else {
        res.json(result)
    }
  })
})

client.login(process.env.TOKEN)