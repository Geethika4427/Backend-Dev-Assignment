const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function fetchInstagramPost(username) {
    const URL = `https://www.instagram.com/${username}/`;

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set user agent to mimic a real browser
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    try {
        await page.goto(URL, { waitUntil: "networkidle2", timeout: 60000 });

        // Wait for Instagram post elements to load
        await page.waitForSelector("article img", { timeout: 10000 });

        // Extract caption & image
        const postData = await page.evaluate(() => {
            const captionEl = document.querySelector("article h1, article span"); // Instagram captions
            const imageEl = document.querySelector("article img"); // Image selector

            return {
                caption: captionEl ? captionEl.innerText : "No caption available",
                imageUrl: imageEl ? imageEl.src : "No image found",
            };
        });

        return postData;
    } catch (error) {
        console.error("Error fetching Instagram post:", error);
        return null;
    } finally {
        await browser.close();
    }
}

module.exports = fetchInstagramPost;
