# Instagram-X Integration

## Overview  
This project integrates Instagram with X.com (formerly Twitter) using Node.js. It fetches the latest post from the **BBC News Instagram account**, summarizes the caption using an **LLM**, and posts the summary as a tweet to an X.com account.

## System Architecture  
1. **Instagram Data Fetching:** Retrieves the latest post’s caption and image.  
2. **Caption Summarization:** Uses an LLM (Hugging Face) to generate a tweet-length summary.  
3. **X.com API Integration:** Posts the summarized text as a tweet.  
4. **Error Handling & Logging:** Handles API failures, rate limits, and logging.  
5. **Dockerization:** The project runs inside a Docker container for easy deployment.  

---

##  Setup Instructions  

### **1️⃣ Clone the Repository**
git clone https://github.com/Geethika4427/Backend-Dev-Assignment.git<br>
cd Backend Dev Assignment

### **2️⃣ Install Dependencies
npm install

### **3️⃣ Configure Environment Variables
Create a .env file in the root directory and add the following:

TWITTER_API_KEY=your_twitter_api_key<br>
TWITTER_API_SECRET=your_twitter_api_secret<br>
TWITTER_ACCESS_TOKEN=your_twitter_access_token<br>
TWITTER_ACCESS_SECRET=your_twitter_access_secret<br>
HUGGINGFACE_API_KEY=your_huggingface_api_key<br>
BASE_URL=http://host.docker.internal:5000

###  Running the Application
1) Local Development

   node server.js<br>
   
2) Run with Docker

   docker build -t instagram-x-integration .<br>
   docker run --rm --env-file .env instagram-x-integration<br>
   
3) Run with Docker Compose<br>

   docker-compose up --build

### API Usage
1) Fetch Instagram Data<br>
   Endpoint:<br>
   GET - http://localhost:5000/fetch-instagram<br>
Response:<br>
{<br>
  "caption": "Relatives of some of Mexico's thousands of disappeared people hoped to find signs of their missing loved ones at a Mexican cartel 'extermination' site. \n \nUp to 200 pairs of shoes, hundreds of items of clothing, scores of suitcases and rucksacks were found at Izaguirre Ranch, after the owners themselves were apparently disposed of.\n \nSeveral ovens and human bone fragments were also found.\n \nThe site was used, activists claim, by the New Generation Jalisco Cartel (CJNG) for the forced recruitment and training of their foot-soldiers, and for torturing their victims and cremating their bodies.\n \nThe place is now crawling with police officers, federal investigators and forensics teams in dust overalls.\n \nTap the link in @BBCNews's bio to read more about the investigation.\n(📷 Getty Images)\n \n#Mexico #BBCNews",<br>
  "imageUrl": "https://instagram.fhyd7-1.fna.fbcdn.net/v/t39.30808-6/484164394_1114930220670969_3846152498680965207_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.fhyd7-1.fna.fbcdn.net&_nc_cat=1&_nc_oc=Q6cZ2AEfkbqaRp9FZnRMrFVWirGq7VaF6BlhFODl-uoE1pucQuvDSDR0TU5XVPZuedh-_Fw&_nc_ohc=1cmhm8l5G_4Q7kNvgFhqJ3v&_nc_gid=M1z8awGDdUT8gCoazEgCtw&edm=AOQ1c0wAAAAA&ccb=7-5&oh=00_AYGscvSRAnVQX-BLRWfbm1XcWCAtYdKCzO7A1Y0wxE-2UA&oe=67DB6E1B&_nc_sid=8b3546"
}<br>

2️) Summarize Caption<br>
   Endpoint:<br>
   POST - http://localhost:5000/summarize<br>
   Request:<br>

   json - body<br>

   {<br>
     "caption": "Mahmoud Khalil, a prominent figure during the Gaza war protests at Columbia University in the spring of 2024, has drawn global attention..."
   }<br>
   Response:<br>
   {<br>
    "summarized_caption": "Mahmoud Khalil was a prominent figure during the Gaza war protests at Columbia University in the spring of 2024. He has drawn global attention for his role in the protests. Khalil is expected to appear on CNN's \"Larry King Live\" at 10 p.m. ET on Monday."
   }<br>
   
3️) Post Tweet<br>
   Endpoint:<br>
   POST - http://localhost:5000/tweet<br>
   Request:<br>
   {<br>
     "caption": "Mahmoud Khalil, a prominent figure during the Gaza war protests at Columbia University in the spring of 2024, has drawn global attention..."
   }<br>
   Response:<br>
   {<br>
    "message": "Tweet posted successfully!",
    "tweet": {<br>
        "data": {<br>
            "text": "Mahmoud Khalil, a prominent figure during the Gaza war protests at Columbia University in the spring of 2024, has drawn global attention...",
            "edit_history_tweet_ids": [
                "1900880656227594383"
            ],
            "id": "1900880656227594383"<br>
        }<br>
    }<br>
}<br>

### Testing
Run Unit Tests<br>

npm test

## Test Cases Covered
Instagram API connectivity<br>
Caption summarization length constraints<br>
X.com API integration<br>
Error handling (API rate limits, network failures)<br>

### Customization
To change the target Instagram account, update the .env file:<br>

INSTAGRAM_USERNAME=news_channel_name

### This README follows best practices and includes everything needed for setup, running, and deploying your project.  

Let me know if you want any modifications!
