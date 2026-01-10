import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


const secretKey = process.env.AUTH_SECRET
const key = new TextEncoder().encode(secretKey)

type SessionPayLoad = {
  userId: String
  role: String
  expiresAt : Date
}

export async function createSession(userId: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const session = await new SignJWT({ userId, role, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key)
  
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function verifySession() {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value

  if (!cookie) return null
  try {
    const { payload } = await jwtVerify(cookie, key)
    return payload as SessionPayLoad
  } catch (error) {
    return null
  }
}

export async function deleteSession() {
  const cooekieStore = await cookies()
  cookieStore.delete('session')

  redirect('/login')
}