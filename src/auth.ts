// src/auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "./auth.config"

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const NextAuthBypass = NextAuth as any; 

export const { handlers, signIn, signOut, auth } = NextAuthBypass({
  ...authConfig, // <--- Logic callback JWT & Session otomatis ke-load dari sini
  providers: [
    Credentials({
      authorize: async (credentials, request) => {
        const parsedCredentials = loginSchema.safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await prisma.user.findUnique({ where: { email } })
          
          if (!user || !user.password) return null
          
          const passwordMatch = await bcrypt.compare(password, user.password)
          
          if (passwordMatch) {
            return { 
              id: user.id, 
              name: user.name, 
              email: user.email, 
              role: user.role as any // Dikirim ke callback JWT di auth.config.ts
            }
          }
        }
        return null
      },
    }),
  ],
})