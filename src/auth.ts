import NextAuth from "next-auth";

// Google認証は一時的に無効化
// Google Cloud Consoleの設定反映後に再度有効化してください
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  pages: {
    signIn: "/auth/signin",
  },
  trustHost: true,
});
