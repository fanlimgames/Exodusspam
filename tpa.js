const autoTp = [
    'fanlimdk',
    ''
  ];
  
  bot.on('messagestr', async (message) => {
    const name = message.replace(/ .*/, '');
    const msg = message.replace(`${name} » `, '');
  
    if (msg.startsWith(`${name} wants to teleport to you.`)) {
      if (autoTp.includes(name)) {
        await bot.waitForTicks(60);
        bot.chat(`/tpy ${name}`);
      }
    } else if (msg.startsWith(`Type /tpy`)) {
      if (autoTp.includes(name)) {
        await bot.waitForTicks(60);
        bot.chat(`/tpy ${name}`);
      }
    }
  });
  