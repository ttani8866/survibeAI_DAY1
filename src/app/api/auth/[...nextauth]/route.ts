import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

const handler = NextAuth({
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

        // 管理者メールアドレスのリストを取得
        const adminEmails = (process.env.ADMIN_EMAILS || "")
          .split(",")
          .map((email) => email.trim().toLowerCase())
          .filter((email) => email);

        // ユーザーのロールを判定
        const isAdmin = adminEmails.includes(user.email?.toLowerCase() || "");
        const userRole = isAdmin ? "admin" : "user";

        // ユーザーがDBに存在するか確認
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          // 既存ユーザー: 情報を更新（管理者リストに基づいてroleも更新）
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
          // 新規ユーザー: 作成
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
        return true; // エラーでもログインは許可
      }
    },
    async jwt({ token, user }) {
      // 初回ログイン時
      if (user?.email) {
        // ADMIN_EMAILSから直接判定（DB接続の有無に関わらず必ず設定）
        const adminEmails = (process.env.ADMIN_EMAILS || "")
          .split(",")
          .map((email) => email.trim().toLowerCase())
          .filter((email) => email);
        const isAdmin = adminEmails.includes(user.email?.toLowerCase() || "");
        token.role = isAdmin ? "admin" : "user";
        token.email = user.email;
        
        // DBからユーザーID取得（失敗しても続行）
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            token.id = dbUser._id.toString();
          }
        } catch (error) {
          console.error("JWT callback DB error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      // セッションにユーザー情報を追加
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
