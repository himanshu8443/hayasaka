import { getToken } from "next-auth/jwt";
import User from "@/models/User";
import dbConnect from "@/utils/dbconnect";


// check if user is logged in
export default async function auth(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (!token) {
        return null
    }
    try {
        dbConnect();
        const user = await User.findOne({ email: token.email });
        if (!user) {
            return null
        }
        return user;
    } catch (error) {
        console.error(error);
        return null
    }
}