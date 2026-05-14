import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const authConfig = {
  trustHost: true,

  pages: {
    signIn: "/login",
    newUser: "/signup",
  },

  providers: [
    // Password Login Provider
    Credentials({
      id: "credentials",
      name: "Password",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          // Secure password check
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordCorrect) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("[AUTH_CREDENTIALS_ERROR]", error);
          return null;
        }
      },
    }),

    // OTP Provider
    Credentials({
      id: "otp",
      name: "OTP",

      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Code", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.code) {
            return null;
          }

          const email = credentials.email as string;
          const code = credentials.code as string;

          const verificationToken =
            await (prisma as any).verificationToken.findFirst({
              where: {
                identifier: email,
                token: code,
                expires: {
                  gt: new Date(),
                },
              },
            });

          if (!verificationToken) {
            return null;
          }

          // Delete OTP after successful verification
          await (prisma as any).verificationToken.delete({
            where: {
              identifier_token: {
                identifier: email,
                token: code,
              },
            },
          });

          const isAcademicEmail =
            email.endsWith(".edu") ||
            email.endsWith(".ac.in") ||
            email.endsWith(".res.in") ||
            email.endsWith(".gov") ||
            email.includes("research.org");

          let user = await prisma.user.findUnique({
            where: { email },
          });

          // Create user if not exists
          if (!user) {
            let hashedPassword: string | null = null;

            if (credentials.password) {
              hashedPassword = await bcrypt.hash(
                credentials.password as string,
                10
              );
            }

            user = await prisma.user.create({
              data: {
                email,
                name: (credentials.name as string) || null,
                password: hashedPassword,
                role: isAcademicEmail
                  ? "ACADEMIC_PREMIUM"
                  : "USER",
                academicStatus: isAcademicEmail
                  ? "APPROVED"
                  : "PENDING",
              },
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("[AUTH_OTP_ERROR]", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;

        if (token.role) {
          (session.user as any).role = token.role;
        }
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }

      return token;
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export default authConfig;