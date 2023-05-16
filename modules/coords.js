// Function to get a random integer between min (inclusive) and max (inclusive)
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  getRandomCoords: () => {
      // Get random coordinates within the defined ranges
      const x = getRandomInt(-30000000, 30000000);
      const y = getRandomInt(0, 256);
      const z = getRandomInt(-30000000, 30000000);
      
      // Return coordinates as an object
      return { x, y, z };
  },
};
