const express= require('express');
const dotenv= require('dotenv');
const morgan=require('morgan');
dotenv.config({path:'config.env'});
const ApiError=require('./utils/apiError.js');
const dbConnection=require('./config/database.js');
// routes
const brandRouter=require('./router/brandRouter.js');
const categoryRouter=require('./router/categoryRouter.js');
const subCategoryRouter=require('./router/subCategoryRouter.js');
const productRouter=require('./router/productRouter.js');
const userRouter=require('./router/userRouter.js');
const orderRouter=require('./router/orderRouter.js');
const cartRouter=require('./router/cartRouter.js');
const couponRouter=require('./router/couponRouter.js');
const authRouter=require('./router/authRouter.js');




const globalErrorHandling = require('./middlewares/errorMiddlware.js');
// db connection
dbConnection();
// express
const app=express();
//middlewares
app.use(express.json())
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
    console.log(`mod:${process.env.NODE_ENV}`);
}


// routes
app.use('/api/v1/categories',categoryRouter);
app.use('/api/v1/subcategories',subCategoryRouter);
app.use('/api/v1/brands',brandRouter);
app.use('/api/v1/products',productRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/order',orderRouter);
app.use('/api/v1/cart',cartRouter);
app.use('/api/v1/coupon',couponRouter);
app.use('/api/v1/auth',authRouter);




app.all('*',(req,res,next)=>{
    next(new ApiError(`can't find this route ${req.originalUrl}`,400));
})

// global err handling for express
app.use(globalErrorHandling);
const PORT=process.env.PORT||4000;
const server=app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
});

// handling error outside express
process.on('unhandledRejection',(err)=>{
    console.error(`unhandledRejection Error ${err.name} |${err.message}`);
    server.close(()=>{
        console.error(`shutting down..`);
        process.exit(1);
    });
});