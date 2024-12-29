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
