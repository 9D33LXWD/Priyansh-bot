const axios = require("axios");
const moment = require("moment-timezone");

module.exports.config = {
  name: "ai",
  version: "1.0.6", // Updated version to reflect changes
  hasPermssion: 0,
  credits: "𝑱𝑼𝑳𝑴𝑰 𝑱𝑨𝑨𝑻",
  description: "Can assist you in completing your homework, speech, and even essays.",
  commandCategory: "chatbots",
  usages: "ask anything",
  cooldowns: 7,
  dependencies: {}
};

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID].name;
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports.run = async function({ api, event, args, Users, Threads }) {
  api.setMessageReaction("", event.messageID, (err) => {}, true);
  api.sendTypingIndicator(event.threadID, true);

  const apiKey = "ddc-a4f-58cf64b46fd84575a17c351b4dbc7da5";
  const baseUrl = "https://api.a4f.co/v1";
  const url = `${baseUrl}/chat/completions`;
  const senderID = event.senderID;

  // Get the user's name
  const userName = await getUserName(api, senderID);
  const currentTime = moment().tz("Asia/Kolkata").format("MMM D, YYYY - hh:mm A");

  const promptMessage = `System: Act as a Messenger Chatbot. As a Chatbot you will be responsible`;
  const blank = args.join(" ");
  const data = `User: ${args.join(" ")}\nYou: `;

  if (blank.length < 2) {
    api.sendMessage("Hello! How may I assist you today?", event.threadID, event.messageID);
    api.setMessageReaction("", event.messageID, (err) => {}, true);
  } else {
    api.sendMessage("Ruk Dekhta hun " + args.join(" "), event.threadID, event.messageID);
    try {
      const response = await axios.post(
        url,
        {
          model: "provider-2/gpt-3.5-turbo",
          messages: [
            { role: "system", content: promptMessage },
            { role: "user", content: data },
          ],
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
        }
      );

      const message = response.data.choices[0].message.content;
      api.setMessageReaction("", event.messageID, (err) => {}, true);
      api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
        api.sendMessage(error.message, event.threadID);
      }
    }
  }
};
