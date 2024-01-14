const {validationResult}=require('express-validator');
const validatorMiddleware=(req,res,next)=>{
    //    catch error from rules if exists
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        // go to the next
        next();
    };
    module.exports=validatorMiddleware;