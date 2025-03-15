const express = require("express");
const fetchInstagramPost = require("./scraper");
const summarizeText = require('./summarizer');
// const postTweet = require('./twitter');
const { postTweet } = require('./twitter'); 

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Route to fetch Instagram latest post
app.get("/fetch-instagram", async (req, res) => {
    try {
        const post = await fetchInstagramPost("bbcnews");
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Instagram post" });
    }
});

// API Endpoint to summarize Instagram captions
app.post('/summarize', async (req, res) => {
    const { caption } = req.body;

    if (!caption) {
        return res.status(400).json({ error: 'Caption is required' });
    }

    const summary = await summarizeText(caption);

    if (!summary) {
        return res.status(500).json({ error: 'Failed to summarize caption' });
    }

    res.json({ summarized_caption: summary });
});

app.post('/tweet', async (req, res) => {
    const { caption } = req.body;

    if (!caption) {
        return res.status(400).json({ error: 'Caption is required' });
    }

    const summary = await summarizeText(caption);
    if (!summary) {
        return res.status(500).json({ error: 'Failed to summarize caption' });
    }

    const tweetResponse = await postTweet(summary);
    if (!tweetResponse) {
        return res.status(500).json({ error: 'Failed to post tweet' });
    }

    res.json({ message: 'Tweet posted successfully!', tweet: tweetResponse });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


