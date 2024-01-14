const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'name required'],
            trim:true,
        },
        email:{
            type: String,
            required:[true,'email required'],
            unique: true,
            lowercase:true,
        },
        phone:String,
        profileImg: String,
        password:{
            type:String,
            required:[true,'password required'],
            minlength:[6,'short paswoord'],
        },
        // passwordChangedAt:Date,
        role:{
            type:String,
            enum:['user','admin'],
            default:'user',
        },
        active:{
            type:Boolean,
            default:true,
        }
    },
    {timestamps:true}
);
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
});
const User=mongoose.model('User',userSchema);
module.exports = User;