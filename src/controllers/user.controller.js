import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import {uploadOnCloudinary} from "..utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser= asyncHandler(async (req,res) => {


  const {fullName,username,email,password}=req.body
    
  if(
   [fullName,username,email,password].some((field)=>
    field?.trim()==="")
   
)
  {
    throw new ApiError(400,"all feilds are required")

  }
 const existedUser= User.findOne({
    username
  })
  if(existedUser){
    throw ApiError (401 ,"username is already exist")
  }
 const avatarLocalPath= req.files?.avatar[0]?.path;
  console.log(avatarLocalPath);
  const coverImageLocalPath= req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(402,"avata file is required")

  }
 const avatar= await uploadOnCloudinary(avatarLocalPath)

 const coverImage= await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar){
    throw new ApiError(402,"avatar file is required")

  }
  const user=await user.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    username: username.toLowerCase()


  })
  console.log(user);
  const  createdUser=await  User.findbyId(user._Id).select(
        "-password -refreshToken"
    )
  if(!createdUser){
    throw new ApiError(501,"something went wrong while registering the user")
  }
  return res.status(201).json(
    new ApiResponse(200,createdUser,"user created sucessfully")
  )
})
export default registerUser