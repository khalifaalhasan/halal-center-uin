declare module "next-auth" {
  interface Session {
    user: {
      role: string
      id: sttring
    } & DefaultSession["user"]
  }

  interface User{
    role:string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    id: string
    
  }
}