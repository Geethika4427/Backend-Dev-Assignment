require('dotenv').config();
const axios = require('axios');
const summarizeText = require('../summarizer');

jest.mock('axios');

describe('summarizeText function', () => {
    it('should return a summarized text when API responds successfully', async () => {
        const mockResponse = {
            data: [{ summary_text: 'This is a summarized version.' }]
        };
        axios.post.mockResolvedValue(mockResponse);

        const text = 'This is a long text that needs to be summarized.';
        const summary = await summarizeText(text);

        expect(summary).toBe('This is a summarized version.');
    });

    it('should return null if API response is unsuccessful', async () => {
        axios.post.mockRejectedValue(new Error('API error'));

        const text = 'This is a long text that needs to be summarized.';
        const summary = await summarizeText(text);

        expect(summary).toBeNull();
    });

    it('should call the API with correct headers and body', async () => {
        const mockResponse = {
            data: [{ summary_text: 'This is a summarized version.' }]
        };
        axios.post.mockResolvedValue(mockResponse);

        const text = 'This is a test text.';
        await summarizeText(text);

        expect(axios.post).toHaveBeenCalledWith(
            'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    });
});
