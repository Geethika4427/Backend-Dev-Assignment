const { postTweet } = require('../twitter'); // Adjust path if necessary
const { TwitterApi } = require('twitter-api-v2');

// Mocking TwitterApi
jest.mock('twitter-api-v2', () => {
    return {
        TwitterApi: jest.fn().mockImplementation(() => ({
            v2: {
                tweet: jest.fn().mockResolvedValue({ data: { id: '123', text: 'Test tweet' } }),
            },
        })),
    };
});

describe('Twitter API - postTweet function', () => {
    let mockClient;

    beforeEach(() => {
        mockClient = new TwitterApi(); // Create a new instance for each test
    });

    it('should post a tweet successfully', async () => {
        const mockResponse = { data: { id: '123', text: 'Test tweet' } };
        mockClient.v2.tweet.mockResolvedValue(mockResponse);

        // Pass mockClient to postTweet
        const result = await postTweet('Test tweet', mockClient);

        expect(mockClient.v2.tweet).toHaveBeenCalledWith('Test tweet');
        expect(result).toEqual(mockResponse);
    });

    it('should return null if tweet fails', async () => {
        mockClient.v2.tweet.mockRejectedValue(new Error('Twitter API error'));

        // Pass mockClient to postTweet
        const result = await postTweet('Test tweet', mockClient);

        expect(mockClient.v2.tweet).toHaveBeenCalledWith('Test tweet');
        expect(result).toBeNull();
    });
});
