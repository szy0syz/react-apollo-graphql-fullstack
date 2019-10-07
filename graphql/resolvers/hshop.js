const Shop = require("../../models/Shop");
const checkAuth = require("../../utils/check-auth");
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    async getHShop(_, { shopId }) {
      try {
        const shop = await Shop.findById(shopId).populate({ path: 'comments.user', model: 'User' });

        return shop;
      } catch (error) {
        throw new Error(error);
      }
    },

    async getHShops(_, { floor, sortBy, commercialTypeID, offset = 0, limit = 20 }) {
      try {
        let query = Shop.find({})
          .skip(offset)
          .limit(limit);
        if (floor) {
          query.where("floor", floor);
        }
        if (commercialTypeID) {
          query.where("commercialTypeID", commercialTypeID);
        }
        if (sortBy === "promotion") query = query.sort({ promotionInfo: -1 });
        if (sortBy === "name") query = query.sort({ name: 1 });
        const data = await query.exec();
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },

    async getHShopsByName(_, { name, limit = 20 }) {
      try {
        const data = await Shop.find({ name: new RegExp(name, "ig") }).limit(limit);

        return data;
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  Mutation: {
    async likeShop(_, { shopId }, context) {
      const { id: userId } = checkAuth(context);
      const shop = await Shop.findById(shopId);

      if (shop) {
        if (shop.likes.find(like => like.user === userId)) {
          // Already likes, unlike it
          shop.likes = shop.likes.filter(like => like.user !== userId);
        } else {
          // Not liked, lile post
          post.likes.push({ user: userId, createdAt: new Date().toISOString() });
        }

        await shop.save();
        return shop;
      } else {
        throw new UserInputError("Shop not found");
      }
    },

    async shopCreateComment(_, { shopId, commentBody, commentImages = [] }, context) {
      const { id: userId } = checkAuth(context);
      let shop = await Shop.findById(shopId);
      
      if (shop) {
        shop.comments.unshift({
          body: commentBody,
          images: commentImages,
          user: userId // ! 惊天Bug: 刚才的populate没有把最后这次user也关联查询出来，导致前端报错
        });
        await shop.save();

        // * 修复最后一条评论user没有关联查询的bug
        shop = await Shop.findById(shopId).populate({ path: 'comments.user', model: 'User', select: 'username' });

        return shop;
      } else {
        throw new UserInputError("Shop not found");
      }
    }
  }
};
