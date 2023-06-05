require('dotenv').config();
const axios = require('axios');

async function openAIPrompt(userPrompt) {
    try {
        const reqBody = {
            messages: [
                {
                    role: 'system',
                    content: '你是一個名叫「OpenAI ChatGPT」的角色。請用小於6歲的孩子能夠聽懂的語言和親切、容易親近的口吻來講話。'
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
            `${ process.env.AZURE_OPENAI_ENDPOINT }openai/deployments/${ process.env.AZURE_OPENAI_MODEL_DEPLOYMENT_NAME }/chat/completions?api-version=2023-03-15-preview`,
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
