// src/app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        // Find the user in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // If user exists and password is correct
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          // Return a user object (without the password) to be encoded in the JWT
          return { id: user.id, email: user.email };
        } else {
          // If authentication fails, return null
          return null;
        }
      }
    })
  ],
  session: {
    // Use JSON Web Tokens for session strategy
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // Tell NextAuth where our custom login page is
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };