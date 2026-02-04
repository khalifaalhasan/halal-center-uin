// src/auth.config.ts
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  providers: [], 
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true; 
    },
    
    // PENTING: Pindahkan Role dari User -> Token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    // PENTING: Pindahkan Role dari Token -> Session (biar kebaca middleware)
    async session({ session, token }) {
      if (session.user && token) {
        // @ts-ignore
        session.user.role = token.role; 
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;