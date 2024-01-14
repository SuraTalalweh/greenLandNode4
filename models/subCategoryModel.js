const mongoose=require('mongoose');

const subCategorySchema= new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            unique:[true,'SubCategory must be unique'],
            minlength:[2,'short SubCategory name'],
            maxlength:[32,'long SubCategory name'],
        },
        slug:{
            type:String,
            lowercase: true,
        },
        // category as forign key
        category:{
            type: mongoose.Schema.ObjectId,
            ref:'Category',
            required:[true,'SubCategory must belong to parent category']
        },
    },
    {timestamps:true}
);
module.exports=mongoose.model('SubCategory',subCategorySchema);