const mineflayer = require("mineflayer");
const colors = require("colors");
const users = require("./users.json");
const spamMessages = require("./messages.json");
const coords = require("./coords");
const blacklist = require("./blacklist.json");

const getRandomMessage = () => {
  return spamMessages[Math.floor(Math.random() * spamMessages.length)];
};

const getRandomCoords = coords.getRandomCoords;

const blacklistRegex = new RegExp(blacklist.join("|"), "i");

let forceStop = false;
const bots = [];

const main = () => {
  users.forEach((account) => {
    connectBot(account);
  });
};

const connectBot = (account, attempt = 1) => {
  const bot = mineflayer.createBot({
    host: account.ip,
    port: parseInt(account.port),
    username: account.username,
    version: account.version,
    skipValidation: true,
  });

  let isEating = false; // Flag to track if the bot is currently eating
  const eatDelay = 1000; // Delay between eating enchanted golden apples in milliseconds

  const eatGap = () => {
    setInterval(() => {
      const hunger = bot.food;
      console.log(`Bot hunger level: ${hunger}`);
      if (hunger < 10 && !isEating) {
        isEating = true;
        const gapSlot = bot.inventory.findItem((item) => {
          return item.name === "minecraft:golden_apple" && item.nbt.value.id.value === "minecraft:enchanted_golden_apple";
        });
        if (gapSlot) {
          bot.equip(gapSlot, "hand");
          bot.activateItem();
          setTimeout(() => {
            isEating = false;
          }, eatDelay);
        } else {
          isEating = false;
        }
      }
    }, 60000); // Check hunger level every 1 minute (60000 milliseconds)
  };

  const isInLobby = (bot) => {
    return !bot || !bot.game || bot.game.levelType !== "default";
  };

  bot.once("spawn", async () => {
    eatGap(); // Call the eatGap function to enable gap eating behavior

    while (!forceStop) {
      await bot.waitForTicks(5);
      if (!isInLobby(bot)) {
        const players = Object.values(bot.players);
        if (players.length === 0) continue;
        const targetIndex = Math.floor(Math.random() * players.length);
        const targetUsername = players[targetIndex].username;
        if (blacklistRegex.test(targetUsername) || bot.username === targetUsername) continue;
        const message = Math.random() < 0.9 ? getRandomMessage() : `Here are some leaked coordinates for you: ${getRandomCoords()}`;
        const styledUsername = colors.cyan(bot.username + " -> " + targetUsername + ":");
        const styledMessage = colors.green.bold(message.toString()); // Add 'bold' to make the message more prominent
        if (!blacklistRegex.test(message)) {
          bot.chat(`/msg ${targetUsername} ${message}`);
          console.log(`${styledUsername} ${styledMessage}`);
          await bot.waitForTicks(5);
        }
      }
      await bot.waitForTicks(2);
    }
  });

  bot.on("login", () => {
    console.log(`${bot.username} logged in!`);
    bot.chat(`/register ${account.password}`);
    setTimeout(() => {
      bot.chat(`/login ${account.password}`);
    }, 2000);
  });

  bot.on("end", (reason) => {
    console.log(`Bot disconnected!
    Reason: ${reason}`);
    if (forceStop) return;
    console.log(`Attempting to reconnect in 5 seconds... (Attempt ${attempt})`);
    setTimeout(() => {
      connectBot(account, attempt + 1);
    }, 5000);
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

main();

