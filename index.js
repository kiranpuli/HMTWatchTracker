require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');

// Replace with your Telegram Bot Token
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

// Replace with the user's chat ID
const chatId = process.env.CHAT_ID;
const watches = JSON.parse(fs.readFileSync('watches.json'));

const validateCredentials = async () => {
  if (!token) {
    console.error('[ERROR] TELEGRAM_BOT_TOKEN is not set in your .env file or GitHub Secrets.');
    console.error('Please ensure it is correctly configured.');
    process.exit(1);
  }
  if (!chatId) {
    console.error('[ERROR] CHAT_ID is not set in your .env file or GitHub Secrets.');
    console.error('Please ensure it is correctly configured (remember the negative sign for group IDs).');
    process.exit(1);
  }

  try {
    const me = await bot.getMe();
    console.log(`[SUCCESS] Bot token is valid. Bot name: ${me.first_name} (@${me.username})`);
  } catch (error) {
    console.error('[ERROR] Invalid TELEGRAM_BOT_TOKEN.');
    console.error('Please get a new token from BotFather and update your .env file/GitHub Secret.');
    process.exit(1);
  }
};

const checkStock = async (watch) => {
  try {
    const response = await axios.get(watch.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
      },
    });
    const html = response.data;

    if (!html.includes('Out of Stock')) {
      await bot.sendMessage(chatId, `${watch.name} is back in stock! Check it out: ${watch.url}`);
      console.log(`Stock alert sent for ${watch.name}!`);
    } else {
      console.log(`${watch.name} is still out of stock.`);
    }
  } catch (error) {
    console.error(`Error checking stock for ${watch.name}:`, error);
  }
};

const checkAllWatches = async () => {
  await validateCredentials(); // Validate credentials before checking stock
  for (const watch of watches) {
    await checkStock(watch);
  }
  process.exit(0);
};

checkAllWatches();
