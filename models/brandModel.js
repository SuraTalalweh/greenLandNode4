const mongoose=require('mongoose');
// schema
const brandSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Brand Required'],
        unique:[true,'Brand must be unique'],
        minlength:[3,'short Brand name'],
        mixlength:[32,'long Brand name'],
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
module.exports= mongoose.model('Brand',brandSchema);
