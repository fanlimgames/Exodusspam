module.exports = {
    getRandomCoords: () => {
      const x = Math.floor(Math.random() * 60000000) - 30000000;
      const y = Math.floor(Math.random() * 256);
      const z = Math.floor(Math.random() * 60000000) - 30000000;
      return `X: ${x}, Y: ${y}, Z: ${z}`;
    },
  };
  