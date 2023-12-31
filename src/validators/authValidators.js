const { check, validationResult }=require("express-validator");

exports.validateSignupRequest=[
    check("firstName").notEmpty().withMessage(" This field is required* "),
    check("lastName").notEmpty().withMessage(" This field is required* "),
    check("email").isEmail().withMessage(" Valid Email is required* "),
    check("phone").notEmpty().withMessage(" Valid Phone number is required* "),
    check("password").isLength({min:5}).withMessage(" PAssword must be atleast 5 characters "),
];
exports.validateSigninRequest=[
    check("email").isEmail().withMessage(" Valid Email is required* "),
    check("password").isLength({min:5}).withMessage(" PAssword must be atleast 5 characters "),
];

exports.isRequestValidated=(req,res,next)=>{
    const errors=validationResult(req);    
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array()[0]})
    }
    next();
}