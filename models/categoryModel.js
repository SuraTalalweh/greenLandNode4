const mongoose=require('mongoose');
// schema
const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Category Required'],
        unique:[true,'Category must be unique'],
        minlength:[3,'short Category name'],
        mixlength:[32,'long category name'],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String,
},
{timestamps:true}
);
// model
const CategoryModel= mongoose.model('Category',categorySchema);
module.exports=CategoryModel;