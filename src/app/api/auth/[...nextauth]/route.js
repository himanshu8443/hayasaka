import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import dbConnect from "@/utils/dbconnect"
import GoogleProvider from "next-auth/providers/google"

const options = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                try {
                    await dbConnect()
                const { email, password } = credentials
                const user = await User.findOne({ email })
                if (user && (await bcrypt.compare(password, user.password))) {
                    return user
                }
                return null
                } catch (e) {
                    console.error(e)
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })        
    ],
    pages: {
        signIn: "/login",
        signOut: "/",
        error: "/",
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.JWT_SECRET,
    // callbacks: {
    //     async jwt(token, user) {
    //         if (user) {
    //             token.id = user.email
    //         }
    //         return token
    //     },

    //     async session(session, token) {
    //         session.user = token
    //         return session
    //     }
    // }
}

const handler = (req, res) => NextAuth(req, res, options)
export { handler as GET, handler as POST }