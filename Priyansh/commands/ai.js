const axios = require("axios");

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Updated by ChatGPT",
    description: "Integrate OpenAI API for AI-powered responses.",
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 2,
    dependencies: {
        "axios": "1.4.0"
    }
};

module.exports.run = async function ({ api, event, args, Users }) {
    const { threadID, messageID } = event;

    // OpenAI API Key
    const OPENAI_API_KEY = "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";

    // Get user query
    const query = args.join(" ");

    // Check if user provided input
    if (!query) {
        return api.sendMessage("Please type a message to ask the AI!", threadID, messageID);
    }

    // Send waiting message
    api.sendMessage("Processing your request, please wait...", threadID, messageID);

    try {
        // Set message reaction to show processing
        api.setMessageReaction("⌛", event.messageID, () => {}, true);

        // Call OpenAI API
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", // Using GPT-3.5 model
                messages: [{ role: "user", content: query }],
                max_tokens: 150, // Maximum response length
                temperature: 0.7 // Response creativity
            },
            {
                headers: {
                    "Authorization": `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // Extract AI response
        const aiResponse = response.data.choices[0].message.content.trim();

        // Send AI response back to the user
        api.sendMessage(aiResponse, threadID, messageID);

        // Set message reaction to success
        api.setMessageReaction("✅", event.messageID, () => {}, true);

    } catch (error) {
        console.error("Error with OpenAI API:", error.message);

        // Send error message to user
        api.sendMessage(
            "An error occurred while processing your request. Please try again later.",
            threadID,
            messageID
        );

        // Set message reaction to error
        api.setMessageReaction("❌", event.messageID, () => {}, true);
    }
};
