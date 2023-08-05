import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbconnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import UserData from "@/models/UserData";

export async function POST(request) {
    const {userName, email, password, imageUrl } = await request.json();
    try {
        if (!userName || !email || !password || !imageUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please fill all the fields",
                    data: null
                },
                { status: 400 }
            );
        }
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists",
                    data: null
                },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await UserData.create({});
        const result = await User.create({ 
            userName,
            email,
            password: hashedPassword,
            imageUrl,
            userData: userData._id
         });
        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                data: result
            }
        );
    } catch (e) {
        console.error(e);
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
