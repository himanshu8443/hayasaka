import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import User from "@/models/User";
import dbConnect from "@/utils/dbconnect";
import UserData from "@/models/UserData";



// Get user data
export async function GET(req){
    const token = await getToken({ req, secret: process.env.JWT_SECRET });
    if (!token) {
        return NextResponse.json(
            {
                success: false,
                message: "User not logged in",
                data: null
            },
            { status: 401 }
        );
    }
    try {
        await dbConnect();
        const user = await User.findOne({ email: token.email });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    data: null
                },
                { status: 404 }
            );
        }
        const userData = await UserData.findById(user.userData);
        if (!userData) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User data not found",
                    data: null
                },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "User Data found",
                data: userData
            }
        );

    } catch (e) {
        console.error('get user data error', e);
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                data: null
            },
            { status: 500 }
        );
    }

}



// Add to favourites
export async function POST(request) {
    const token = await getToken({ req: request, secret: process.env.JWT_SECRET });
    if (!token) {
        return NextResponse.json(
            {
                success: false,
                message: "User not logged in",
                data: null
            },
            { status: 401 }
        );
    }
    const { id } = await request.json();
    try {
        await dbConnect();
        const user = await User.findOne({ email: token.email });
        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    data: null
                },
                { status: 404 }
            );
        }
        const userData = await UserData.findById(user.userData);
        if (!userData) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User data not found",
                    data: null
                },
                { status: 404 }
            );
        }
        // console.log('userData',userData.favourites);
        if (userData.favourites.includes(id)) {
            //remove from favourites
           await  userData.updateOne({ $pull: { favourites: id } });

        } else {
            //add to favourites
            await userData.updateOne({ $push: { favourites: id } });
        }
        // await userData.save();
        const favourites = await UserData.findById(user.userData);
        return NextResponse.json(
            {
                success: true,
                message: "Favourites updated",
                data: favourites
            }
        );

    } catch (e) {
        console.log('add to favourites error', e);  
        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
                data: null
            },
            { status: 500 }
        );
    }

}