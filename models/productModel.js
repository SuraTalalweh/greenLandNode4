const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"short product"],
        maxlength:[100,"long product"],
    },
    slug:{
        type:String,
        required:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:[true,'Product is required'],
        minlength:[20,'short product description'],
    },
    quantity:{
        type:Number,
        required:[true,'Product quantity is required'],
    },
    // كم مره انباع منصير نزيد واحد
    sold:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        required:[true,'Product price is required'],
        trim:true,
        max:[20000,'long price product'],
    },
    priceAfterDiscount:{
        type:Number,
    },
    colors:[String],
    imageCover:{
        type:String,
        required: [true, 'Image cover is required'],
    },
    images:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'Please add a Category ,the product must belong to category'],
    },
    subcategories:[{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    },
    ],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand',
    },
    ratingAverage:{
        type:Number,
        min:[1,'Rating must be above or equal 1'],
        max:[5,'Rating must be below or equal 5'],
    },
    // عدد المقيمين كم واحد قيم المنتج عندي
    ratingsQuantity:{
        type:Number,
        default:0,
    },
},{timestamps:true});

productSchema.pre(/^find/, function (next){
    this.populate({
        path : 'category',
        select : 'name',
    });
    next();
});

module.exports=mongoose.model('Product',productSchema);