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
    async getHShops(
      _,
      { floor, sortBy, commercialTypeID, offset = 0, limit = 20 }
    ) {
      try {
        let query = Shop.find({})
          .skip(offset)
          .limit(limit);
        if (floor) {
          query.where('floor', floor);
        }
        if (commercialTypeID) {
          query.where('commercialTypeID', commercialTypeID);
        }
        if (sortBy === 'promotion') query = query.sort({ promotionInfo: -1 });
        if (sortBy === 'name') query = query.sort({ name: -1 });
        const data = await query.exec();
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
