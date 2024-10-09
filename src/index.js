import connectDb from './db/db.js'; // Adjust the path as needed
import { app } from './app.js';
connectDb()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
        
    })
})
.catch((error)=>{
    console.log("Mongidb connection failed",error);
    
})







