import mongoose from "mongoose";
import bycrpt from "bycrpt"
import jsonwebtoken from "jsonwebtoken";

const userSchema =new Schem({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim :true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim :true,
       
    },
    fullName:{
        type:String,
        required:true,
        
        lowercase:true,
        trim :true,
       index: true,
    },
    avatar:{
        type:String,
        required:true,
       
       
    },
    coverImage:{
        type:String,
    },
    watchHistory:[{
        type:Schema.Types.ObjectId,
        ref:"video"
    }],
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String
    }
},{
    timestapms:true,
    
}

)
userSchema.pre("save",async function(next){

    if(!this.isModified("password")) return next()

    this.password=bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect= async function(password){
  return await bycrpt.comapre(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
  return  jwt.sign( {
    _id:this._id,
    email:this.email,
    username:this.username
    

},
process.env.ACCESS_TOKEN_SECRET,
{
    expiresIn:process.env. ACCESS_TOKEN_EXPIRY

})
    
    
}
userSchema.methods.generateRefreshToken=function(){
    return  jwt.sign({
        _id:this._id,
        
        

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env. REFRESH_TOKEN_EXPIRY

    })
   

}
export const User=mongoose.model("user",userSchema)