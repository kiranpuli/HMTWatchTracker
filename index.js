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

const checkStock = async (watch) => {
  try {
    const response = await axios.get(watch.url);
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
  for (const watch of watches) {
    await checkStock(watch);
  }
  process.exit(0);
};

checkAllWatches();
