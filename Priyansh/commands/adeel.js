const fs = require("fs");

module.exports.config = {
  name: "amir",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
  description: "Send random images when Adeel is mentioned",
  commandCategory: "no prefix",
  usages: "admin",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID, body } = event;
  
  // Check if message contains "adeel", "Admin", or "Adeel"
  if (body.indexOf("adeel") == 0 || body.indexOf("Admin") == 0 || body.indexOf("Adeel") == 0) {

    // List of images (add more images to this list as per your need)
    const images = [
      __dirname + "/noprefix/adeel.jpg",
      __dirname + "/noprefix/adeel2.jpg",
      __dirname + "/noprefix/adeel3.jpg",
    ];

    // Randomly select an image from the array
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // Create message with random image
    var msg = {
      body: "🫅 My Owner Adeel Baloch 🫅",
      attachment: fs.createReadStream(randomImage),
    };

    // Send the message with the random image
    api.sendMessage(msg, threadID, messageID);

    // Set reaction to the message
    api.setMessageReaction("🫅", event.messageID, (err) => {}, true);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
  // Empty function, not used in this case
};
