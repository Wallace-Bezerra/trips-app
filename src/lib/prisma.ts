// import { PrismaClient } from '@prisma/client'

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ['query'],
//   })

// // eslint-disable-next-line no-unused-expressions
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma
import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line no-undef
declare const global: Global & { prisma?: PrismaClient }

export let prisma: PrismaClient

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }
    prisma = global.prisma
  }
}
