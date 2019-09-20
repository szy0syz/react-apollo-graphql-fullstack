const lodash = require('lodash');
const data = require('./floorInfo');

module.exports = {
  Query: {
    async getShop(_, { shopNumber }) {
      try {
        const re = new RegExp(lodash.escapeRegExp(shopNumber), 'i');
        const isMatch = result => re.test(result.number);

        const results = lodash.filter(data, isMatch);
        console.log('~~~result', results);
        return results;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
