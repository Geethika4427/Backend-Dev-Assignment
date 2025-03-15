# Use a full Node.js image instead of Alpine (Alpine causes Puppeteer issues)
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install Node.js dependencies
RUN npm install dotenv

# Install dependencies required for Puppeteer to work inside Docker
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libgbm-dev \
    libnspr4 \
    libnss3 \
    libxss1 \
    xdg-utils \
    libx11-xcb1 \
    && rm -rf /var/lib/apt/lists/*

# Copy all project files to the container
COPY . .

# Expose the port your app runs on
EXPOSE 5000  

# Run the application
CMD ["node", "server.js"]
