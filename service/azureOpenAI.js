require('dotenv').config();
const axios = require('axios');

async function openAIPrompt(userPrompt) {
    try {
        const reqBody = {
            messages: [
                {
                    role: 'system',
                    content: '你是一個核能專家的角色。請用普通人能夠聽懂的語言和親切、容易親近的口吻來講話。'
                },
                {
                    role: 'user',
                    content: userPrompt
                },
                {
                    role: 'assistant',
                    content: ''
                }
            ],
            temperature: 0.7,
            top_p: 0.95,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 800,
            stop: null
        };
        const res = await axios.post(
            `https://ernes-m97xor76-swedencentral.cognitiveservices.azure.com/openai/deployments/gpt-4o-2/chat/completions?api-version=2025-01-01-preview`,
            JSON.stringify(reqBody),
            {
                headers: {
                    'content-type': 'application/json',
                    'api-key': process.env.AZURE_OPENAI_KEY
                }
            }
        );
        return res.data.choices[0].message.content;
    } catch (error) {
        console.error(error);
        return `${ error.response.status } - ${ error.response.statusText }`;
    }
}

module.exports = {
    openAIPrompt
};
