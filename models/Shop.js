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
  },
  { timestamps: true }
);

module.exports = model('Shop', ShopSchema);
