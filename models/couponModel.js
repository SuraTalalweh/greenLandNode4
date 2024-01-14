const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Coupon name required'],
      unique: true,
    },
    expire: {
      type: Date,
      required: [true, 'Coupon expire time required'],
    },
    isDeleted:{
      type:Boolean,
      default:false
    },
    amount:{type:Number,required:true},
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);