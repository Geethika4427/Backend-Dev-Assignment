require('dotenv').config();
const axios = require('axios');

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
const MODEL_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';

async function summarizeText(text) {
    try {
        const response = await axios.post(
            MODEL_URL,
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("Using API Key:", HUGGINGFACE_API_KEY);
        return response.data[0].summary_text;
    } catch (error) {
        console.error('Error summarizing text:', error.response?.data || error.message);
        return null;
    }
}

// Example usage
(async () => {
    const caption = "Two teens were detained after peeing in soup at one of China’s biggest hotpot restaurants. Haidilao has now offered to compensate more than 4,000 diners who visited the outlet between 24 February and 8 March. Tap the link in @BBCNews’s bio to read what the company said about the incident.";
    const summary = await summarizeText(caption);
    console.log('Summarized Tweet:', summary);
})();

module.exports = summarizeText;
