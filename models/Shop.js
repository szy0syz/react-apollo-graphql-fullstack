const { Schema, model } = require('mongoose');

const ShopSchema = new Schema(
  {
    name: String,
    floor: String,
    logo: String,
    commercialTypeID: Number,
    commercialTypeName: String,
    subCommercialTypeName: String,
    floorName: String,
    doorNo: String,
    businessHours: String,
    shopStatus: Number,
    shopType: Number,
    shopMode: Number,
    promotionInfo: String,
    telphoneList: [
      {
        PhoneRemark: String,
        Phone: String,
      },
    ],
    comments: [
      {
        body: String,
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
      },
    ],
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = model('Shop', ShopSchema);
