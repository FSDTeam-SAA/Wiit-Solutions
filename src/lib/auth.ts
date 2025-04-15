// /lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Example: Dummy user (Replace this with real DB/API call)
        const user = {
          id: "1",
          name: "Sylviamai",
          email: "user@example.com",
          password: "123456", // In real apps, use hashed passwords
        };

        // Check if credentials match
        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          // Return user object (excluding password!)
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        // Invalid credentials
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // use JWT for sessions
  },
  pages: {
    signIn: "/login", // custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // make sure this is set in .env
};
