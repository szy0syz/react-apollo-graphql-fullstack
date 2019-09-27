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
      { floor = 1, sortBy, commercialTypeID = 100, pageIndex = 1, pageSize = 10 }
    ) {
      try {
        let query = Shop.find({ floor, commercialTypeID })
          .skip((pageIndex - 1) * pageSize)
          .limit(pageSize);
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
