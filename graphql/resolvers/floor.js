const data = require('./floorInfo');

module.exports = {
  Query: {
    async getFloor(_, { floorId }) {
      try {
        // console.log('[***] floorId: ', floorId);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
