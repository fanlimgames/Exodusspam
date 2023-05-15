const EAT_DELAY = 1000; // Delay between eating enchanted golden apples in milliseconds
const HUNGER_THRESHOLD = 10; // The hunger level at which the bot should eat
const INTERVAL_CHECK = 60000; // Interval to check hunger level (1 minute)
let isBotEating = false; // Flag to track if the bot is currently eating

const findEnchantedGoldenApple = (bot) => {
  return bot.inventory.findItem((item) => {
    return item.name === "minecraft:golden_apple" && item.nbt.value.id.value === "minecraft:enchanted_golden_apple";
  });
};

const eatGap = (bot) => {
  setInterval(() => {
    const hunger = bot.food;
    console.log(`Bot hunger level: ${hunger}`);
    if (hunger < HUNGER_THRESHOLD && !isBotEating) {
      isBotEating = true;
      const gapSlot = findEnchantedGoldenApple(bot);
      if (gapSlot) {
        bot.equip(gapSlot, "hand");
        bot.activateItem();
        setTimeout(() => {
          isBotEating = false;
        }, EAT_DELAY);
      } else {
        isBotEating = false;
      }
    }
  }, INTERVAL_CHECK);
};

const isInLobby = (bot) => {
  return !bot || !bot.game || bot.game.levelType !== "default";
};

module.exports = {
  eatGap,
  isInLobby
};
