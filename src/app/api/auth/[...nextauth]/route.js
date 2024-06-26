import NextAuth from "next-auth"
import githubAuth from "next-auth/providers/github"

export const authOption = {
    providers:[
        githubAuth({
            clientId:process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token, user }) {
          // Add user id to the session
          session.user.id = token.sub
          return session
        },
        async jwt({ token, account, profile }) {
          // Add custom claims to the JWT
          if (account) {
            token.accessToken = account.access_token
          }
          return token
        },
      },
      pages: {
        // Custom pages for authentication (optional)
        // signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error',
      },
      // Enable debug messages in the console if you are having problems
      debug: process.env.NODE_ENV === 'development',
}


const handler = NextAuth(authOption)

export {handler as GET , handler as POST}