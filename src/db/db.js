import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { dbName } from '../constant.js';

dotenv.config();

const connectDb = async () => {
    try {
     const connectInstance= await mongoose.connect(`${process.env.MONGODB_URI}/`);
      console.log(`Connected to MongoDB || db host :${
          connectInstance.connection.host}/${dbName}` );
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };

export default connectDb;

// import { connect, mongoose } from "mongoose";
// import { dbName } from "../constant";
 
//  const connectDb = async () => {
//   try {
//    const connectInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
//     console.log(`Connected to MongoDB || db host :${
//         connectInstance.connection.host}` );
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// };
// export default connectDb
// // connectDb();


