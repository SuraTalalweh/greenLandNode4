class ApiFeatures{
    constructor(mongooseQuery,queryStr){
        this.mongooseQuery=mongooseQuery;
        this.queryStr=queryStr;
    }
    filter(){
     const queryStringObj={...this.queryStr};
    const excludesFields=['page','sort','limit','fields'];
    excludesFields.forEach((field)=> delete queryStringObj[field]);
    let queryStr= JSON.stringify(queryStringObj);
    queryStr= queryStr.replace(/\b(gte|gt|lte|lt)\b/g,(match)=>`$${match}`);
     this.mongooseQuery=this.mongooseQuery.find(JSON.parse(queryStr));

     return this;
    }
    sort(){
        if (this.queryStr.sort){
            const sortBy=this.queryStr.sort.split(',').join(' ');
            this.mongooseQuery=this.mongooseQuery.sort(sortBy);
        }else{
            this.mongooseQuery=this.mongooseQuery.sort('-createdAt');
        }
        return  this;
    }
    limitFields(){
        if(this.queryStr.fields){
            const fields= this.queryStr.fields.split(',').join(' ');
            this.mongooseQuery=this.mongooseQuery.select(fields);
        }else{
            this.mongooseQuery=this.mongooseQuery.select('-_v');
        }
        return this;
    }
    search(modelName){
        if(this.queryStr.keyword){
            let query= {};
            if(modelName==='Products'){
            query.$or=[
                { title: {$regex: this.queryStr.keyword, $options:'i'}},
                { description: { $regex: this.queryStr.keyword, $options:'i'}},
                ];
            }else{
                query = { name : { $regex: this.queryStr.keyword ,$options:'i'}};
            }
                this.mongooseQuery=this.mongooseQuery.find(query);
        }
        return this;
    }
    paginate(countDocument){
        const page=this.queryStr.page*1 ||1;
        const limit=this.queryStr.limit*1 || 5;
        const skip=(page-1)*limit;
        const endIndex= page*limit;

        const pagination ={};
        pagination.currentPage=page;
        pagination.limit=limit;
        pagination.numberOfPages=Math.ceil(countDocument/limit);

        if(endIndex <countDocument){
            pagination.next=page+1;
        }
        if(skip>0){
            pagination.previous=page-1 ;
        }
        this.mongooseQuery=this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult=pagination;
        return this;
    }
}
module.exports=ApiFeatures;