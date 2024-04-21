import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/dbconnect";
import GoogleProvider from "next-auth/providers/google";
import UserData from "@/models/UserData";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          await dbConnect();
          console.log("credentials");
          const { email, password } = credentials;
          const user = await User.findOne({ email });
          if (user && (await bcrypt.compare(password, user.password))) {
            return user;
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
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

  callbacks: {
    // async session({ session}) {
    //     const  sessionUser  = await User.findOne({ email: session.user.email });
    //     if (sessionUser) {
    //         session.user.id = sessionUser._id;
    //         session.userName = sessionUser.userName;
    //         session.imageUrl = sessionUser.imageUrl;
    //         session.isVerified = sessionUser.isVerified;
    //     }
    //     return session;
    // },

    async signIn({ account, profile }) {
      if (account.provider === "google") {
        try {
          await dbConnect();
          const { name, email, picture } = profile;
          const userDB = await User.findOne({ email });
          if (!userDB) {
            const userData = await UserData.create({});
            const newUser = await User.create({
              userName: name,
              email,
              imageUrl: picture,
              userData: userData._id,
              isVerified: profile.email_verified,
            });
            return newUser;
          }
          return userDB;
        } catch (e) {
          console.error(e);
          return null;
        }
      }
      return true;
    },
  },
};

const handler = (req, res) => NextAuth(req, res, options);
export { handler as GET, handler as POST };
