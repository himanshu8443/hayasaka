import mongoose from "mongoose"

const MONGODB_URL = process.env.MONGODB_URL;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    )
}


const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }
    return mongoose.connect(MONGODB_URL, {
        dbName: DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>console.log("connected to db")).catch((err)=>console.log(err));
}

export default dbConnect;