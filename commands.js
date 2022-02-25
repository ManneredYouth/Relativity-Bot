require('dotenv').config();
const fetch = require('node-fetch')
const mongoose = require('mongoose')
const MessageModel = require('./models/message')

let zaMessage;

async function messageHandler(msg) {
  let keywords = "jojo"
  let tokens = msg.content.split(" ");

  if (tokens[0] === "!gif") {
    let keywords = "jojo"
    if (tokens.length > 1) {
      keywords = tokens.slice(1, tokens.length).join(" ")
    }

    let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}`
    let response = await fetch(url);
    let json = await response.json()
    console.log(json)
    const r = Math.floor(Math.random() * json.results.length)
    msg.channel.send(json.results[r].url);
  }

  mongoose.connect(process.env.MONGO, () => {
  console.log("Database connected...")
    }, {
      keepAlive: true
    })

  new MessageModel({
    content: msg.content,
    username: `${msg.author.username}`
  }).save()
}

module.exports = {messageHandler}