const lodash = require('lodash');
const data = require('./floorInfo');
const Shop = require('../../models/Shop');

module.exports = {
  Query: {
    async getHShop(_, { shopId }) {
      try {
        const shop = await Shop.findById(shopId);

        return shop;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getHShops(_, { floor, sortBy, commercialTypeID }) {
      try {
        const data = await Shop.find({ floor, commercialTypeID });

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
