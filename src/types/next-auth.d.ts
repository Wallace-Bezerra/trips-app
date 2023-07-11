/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
    } & DefaultSession['user']
  }
}
