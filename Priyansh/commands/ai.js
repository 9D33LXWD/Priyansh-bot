const axios = require("axios");

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "OpenAI-based AI command",
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 2,
    dependecies: {
        "axios": "1.4.0"
    }
};

module.exports.run = async function ({ api, event, args, Users }) {

  const { threadID, messageID } = event;

  const query = encodeURIComponent(args.join(" "));

  var name = await Users.getNameUser(event.senderID);

  if (!args[0]) return api.sendMessage("Please type a message...", threadID, messageID );
  
  api.sendMessage("Searching for an answer, please wait...", threadID, messageID);

  try {
    // Define the OpenAI API URL and API Key
    const apiKey = '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';  // Replace with your actual OpenAI API key
    const apiUrl = 'https://api.openai.com/v1/completions';

    // Send a request to OpenAI
    const response = await axios.post(apiUrl, {
      model: 'text-davinci-003',  // Or you can use another model like "gpt-3.5-turbo"
      prompt: query,
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    });

    // Extract the text response from OpenAI
    const aiResponse = response.data.choices[0].text.trim();

    // Send the response back to the user
    api.sendMessage(aiResponse, event.threadID, event.messageID);

  } catch (error) {
    console.error('Error fetching response from OpenAI:', error);
    api.sendMessage("An error occurred while fetching data. Please try again later.", event.threadID, event.messageID);
  }
};
