// responsible class for operation error(errors i can predict)
class ApiError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith(4)? 'fail':'error';
        this.isOperational=true;
    }
}
module.exports=ApiError;
//كلاس فيه كمبوننت بستخدمه لما احاول اعمل جينيريت لايرور انا توقعته