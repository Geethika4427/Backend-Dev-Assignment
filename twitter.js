require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Initialize Twitter client
const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
});

// Function to post a tweet
async function postTweet(text, twitterClient = client) {
    try {
        const tweet = await twitterClient.v2.tweet(text);
        console.log('Tweet Posted:', tweet);
        return tweet;
    } catch (error) {
        console.error('Error posting tweet:', error);
        return null;
    }
}

// Export both function and client (for test mocking)
module.exports = { postTweet, client };

