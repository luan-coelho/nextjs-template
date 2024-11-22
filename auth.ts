import NextAuth from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  pages: {
    signIn: "/auth/login",
  },
})
