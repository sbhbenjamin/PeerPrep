import NextAuth from "next-auth"
import GithubProvider from 'next-auth/providers/github'

const handler = NextAuth({
  providers:[
    GithubProvider({
      clientId: "485e43506fbb5aa04d09",
      clientSecret: "c72469946a1dd8266c8c3b21da0c936a5b34457f"
    })
  ]
})

export { handler as GET, handler as POST }