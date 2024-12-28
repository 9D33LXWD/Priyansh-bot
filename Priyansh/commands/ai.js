const axios = require('axios');

// OpenAI API Key
const OPENAI_API_KEY = 'your_openai_api_key';

// ChatGPT API Function
async function chatWithGPT(prompt) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo', // Model type
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 150, // Response length
                temperature: 0.7 // Creativity level
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error with OpenAI API:', error.message);
        return 'Kuch ghalat ho gaya hai! Baad mein try karein.';
    }
}

// Command Handler
module.exports = {
    name: 'ai', // Command name
    description: 'AI-powered responses using ChatGPT.',
    async execute(client, message, args) {
        // Check if user provided input
        if (!args.length) {
            return message.reply('Kya puchhna chahte ho? Example: `ai Hello!`');
        }

        // Join user arguments as prompt
        const prompt = args.join(' ');

        // Get AI Response
        const reply = await chatWithGPT(prompt);

        // Send AI Response back to user
        message.channel.send(reply);
    }
};
