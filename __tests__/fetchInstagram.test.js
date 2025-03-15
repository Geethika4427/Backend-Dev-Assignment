const fetchInstagramPost = require("../scraper");

describe("Instagram Scraper", () => {
    test("should fetch latest post from BBCNews Instagram", async () => {
        const result = await fetchInstagramPost("bbcnews");
        console.log("Fetched Instagram Post:", result); // Debug log to print fetched data
        expect(result).toHaveProperty("caption");
        expect(result).toHaveProperty("imageUrl");
    }, 10000);

    test("should handle errors gracefully", async () => {
        const result = await fetchInstagramPost("invalid_username");
        console.log("Error Handling Result:", result); // Debug log to check error handling
        expect(result).toBeNull();
    }, 10000);
});