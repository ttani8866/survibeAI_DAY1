import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();

        const adminEmails = (process.env.ADMIN_EMAILS || "")
          .split(",")
          .map((email) => email.trim().toLowerCase())
          .filter((email) => email);

        const isAdmin = adminEmails.includes(user.email?.toLowerCase() || "");
        const userRole = isAdmin ? "admin" : "user";

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          await User.findOneAndUpdate(
            { email: user.email },
            {
              name: user.name,
              image: user.image,
              role: userRole,
            }
          );
          console.log("ユーザー情報を更新しました:", user.email, "role:", userRole);
        } else {
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image,
            role: userRole,
          });
          await newUser.save();
          console.log("新規ユーザーを作成しました:", user.email, "role:", userRole);
        }

        return true;
      } catch (error) {
        console.error("ユーザー保存エラー:", error);
        return true;
      }
    },
    async jwt({ token, user }) {
      // 初回サインイン時: userからemailを取得
      if (user?.email) {
        token.email = user.email;
      }

      // emailがある場合は毎回ADMIN_EMAILSをチェック
      const email = token.email as string | undefined;
      if (email) {
        const adminEmails = (process.env.ADMIN_EMAILS || "")
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter((e) => e);
        const isAdmin = adminEmails.includes(email.toLowerCase());
        token.role = isAdmin ? "admin" : "user";
        console.log("JWT callback: email=", email, "role=", token.role, "adminEmails=", adminEmails);

        // IDがまだない場合はDBから取得
        if (!token.id) {
          try {
            await connectDB();
            const dbUser = await User.findOne({ email });
            if (dbUser) {
              token.id = dbUser._id.toString();
            }
          } catch (error) {
            console.error("JWT callback DB error:", error);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
};

