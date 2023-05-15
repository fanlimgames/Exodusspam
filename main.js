const mineflayer = require("mineflayer");
const colors = require("colors");
const users = require("./users.json");
const spamMessages = require("./messages.json");
const coords = require("./coords");
const blacklist = require("./blacklist.json");
const { eatGap, isInLobby } = require("./botBehaviors"); 

const getRandomMessage = () => {
  return spamMessages[Math.floor(Math.random() * spamMessages.length)];
};

const getRandomCoords = coords.getRandomCoords;

const blacklistRegex = new RegExp(blacklist.join("|"), "i");

let forceStop = false;
const bots = [];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const connectBot = async ({ ip, port, username, version, password }, attempt = 1) => {
  const bot = mineflayer.createBot({
    host: ip,
    port: parseInt(port),
    username,
    version,
    skipValidation: true,
  });

  bot.once("spawn", async () => {
    eatGap(bot); // Start the bot's eating behavior
    while (!forceStop) {
  
      await bot.waitForTicks(5);
      if (!isInLobby(bot)) {
        const players = Object.values(bot.players);
        if (players.length === 0) continue;
        const targetIndex = Math.floor(Math.random() * players.length);
        const targetUsername = players[targetIndex].username;
        if (blacklistRegex.test(targetUsername) || bot.username === targetUsername) continue;
        const message = Math.random() < 0.9 ? getRandomMessage() : `Here are some leaked coordinates for you: X: ${getRandomCoords().x}, Y: ${getRandomCoords().y}, Z: ${getRandomCoords().z}`;
        if (!blacklistRegex.test(message)) {
          bot.chat(`/msg ${targetUsername} ${message}`);
          
          const timestamp = new Date().toLocaleString();
          const styledUsername = colors.cyan(`${bot.username} -> ${targetUsername}:`);
          const styledMessage = colors.green.bold(message);
          console.log(`[${timestamp}] ${styledUsername} ${styledMessage}`);
          await bot.waitForTicks(5);
        }
      }
      await bot.waitForTicks(2);
    }
  });

  bot.on("login", async () => {
    console.log(`${bot.username} logged in!`);
    bot.chat(`/register ${password}`);
    await sleep(2000);
    bot.chat(`/login ${password}`);
  });

  bot.on("end", async (reason) => {
    console.log(`Bot disconnected! Reason: ${reason}`);
    if (forceStop) return;
    console.log(`Attempting to reconnect in 5 seconds... (Attempt ${attempt})`);
    await sleep(5000);
    connectBot({ ip, port, username, version, password }, attempt + 1);
  });

  bot.on("error", (err) => {
    console.error("An error occurred:", err);
  });

  bot.on("message", (message, position) => {
    if (position === "system" || message.toString().startsWith("<")) return;
    const styledUsername = colors.cyan("[CHAT]");
    const styledMessage = colors.white(message.toString());
    console.log(`${styledUsername} ${styledMessage}`);
  });

  bots.push(bot);
};

const isInLobby = (bot) => {
  return !bot || !bot.game || bot.game.levelType !== "default";
};

const main = async () => {
  await Promise.all(users.map(connectBot));
};

main();
