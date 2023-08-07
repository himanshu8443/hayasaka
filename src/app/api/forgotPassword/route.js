import { NextResponse } from "next/server";
import User from "@/models/User";
import mailSender from "@/utils/mailSender";
import dbConnect from "@/utils/dbconnect";
import crypto from "crypto";
import bcrypt from "bcryptjs";



// Forgot password mail
export async function POST(request) {
    const {email} = await request.json();
    if (!email) {
        return NextResponse.json(
            {
                success: false,
                message: "User not found",
                data: null
            },
            { status: 401 }
        );
    }
    try {
        await dbConnect();
        const user = await User.findOne({ email: email });
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
     

        const resetPasswordToken = crypto.randomBytes(20).toString('hex'); 
        // 5 minutes password reset token
        const resetPasswordExpires = Date.now() + 300000; 

        const updatedUser = await User.findByIdAndUpdate(user._id, {
            resetPasswordToken,
            resetPasswordExpires
        }, { new: true });

        if (!updatedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    data: null
                },
                { status: 404 }
            );
        }

            const url = `${process.env.NEXTAUTH_URL}/reset-password/${resetPasswordToken}`;
            const title = "Reset Password";
            const body = `<p>Click <a href="${url}">here</a> to reset your password valid for 5 min</p>`;
            const mail = await mailSender(user.email, title, body);
            if (mail) {
                return NextResponse.json(
                    {
                        success: true,
                        message: "Reset password mail sent",
                        data: null
                    }
                );
            }
            return NextResponse.json(
                {
                    success: false,
                    message: "Something went wrong",
                    data: null
                },
                { status: 500 }
            );

    } catch (e) {
        console.error('Forgot password error', e);
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




// Reset password
export async function PUT(request) {
    const {token, password, confirmPassword} = await request.json();
    if (!token || !password || !confirmPassword) {
        return NextResponse.json(
            {
                success: false,
                message: "Please fill all the fields",
                data: null
            },
            { status: 400 }
        );
    }
    try {
        // Check if token is valid
        await dbConnect();
        const checkToken = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!checkToken) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Token expired",
                    data: null
                },
                { status: 401 }
            );
        }
        // Check if password and confirm password are same
        if (password !== confirmPassword) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password and confirm password are not same",
                    data: null
                },
                { status: 400 }
            );
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update password
        const updatedUser = await User.findByIdAndUpdate(checkToken._id, {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
        }, { new: true });
        if (!updatedUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                    data: null
                },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                success: true,
                message: "Password updated successfully",
                data: null
            }
        );
        
    }
    catch (e) {
        console.error('Reset password error', e);
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