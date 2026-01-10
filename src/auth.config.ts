export const authConfig = {
  pages: {
    signIn: '/login',
  },
  session: { 
    strategy: "jwt" as const, // 'as const' biar TS ga rewel soal string literal
    maxAge: 24 * 60 * 60, 
  },
  callbacks: {
    // 1. Fix error 'implicit any' pada Authorized
    // Kita kasih tipe ': any' biar aman dulu
    authorized({ auth, request: { nextUrl } }: { auth: any; request: any }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnLogin = nextUrl.pathname.startsWith('/login')

      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false 
      }

      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/dashboard', nextUrl))
        }
        return true 
      }

      return true
    },
    
    // 2. Fix error 'implicit any' pada JWT
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },

    // 3. Fix error 'implicit any' pada Session
    async session({ session, token }: { session: any; token: any }) {
      if (session.user && token) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
  providers: [], 
}