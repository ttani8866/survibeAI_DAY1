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
    }),
  ],
  // pages設定を一時的に無効化してテスト
  // pages: {
  //   signIn: "/auth/signin",
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();

        // ユーザーがDBに存在するか確認
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          // 既存ユーザー: 情報を更新
          await User.findOneAndUpdate(
            { email: user.email },
            {
              name: user.name,
              image: user.image,
            }
          );
          console.log("ユーザー情報を更新しました:", user.email);
        } else {
          // 新規ユーザー: 作成
          const newUser = new User({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
          });
          await newUser.save();
          console.log("新規ユーザーを作成しました:", user.email);
        }

        return true;
      } catch (error) {
        console.error("ユーザー保存エラー:", error);
        return true; // エラーでもログインは許可
      }
    },
  },
});

export { handler as GET, handler as POST };
