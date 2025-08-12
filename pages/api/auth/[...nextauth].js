import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const admins = (process.env.ADMIN_EMAILS || '').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
      const email = (user.email || '').toLowerCase();
      await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email, name: user.name || '', role: admins.includes(email) ? 'ADMIN' : 'USER' }
      });
      return true;
    },
    async session({ session }) {
      if (!session?.user?.email) return session;
      const u = await prisma.user.findUnique({ where: { email: session.user.email } });
      if (u) { session.user.role = u.role; session.user.id = u.id; }
      return session;
    }
  },
  session: { strategy: "jwt" }
};
export default function auth(req, res) { return NextAuth(req, res, authOptions); }
