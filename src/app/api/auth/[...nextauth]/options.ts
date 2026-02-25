import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// گسترش اینترفیس User
declare module "next-auth" {
  interface User {
    role?: string;
    token?: string;
    username?: string;
  }
  interface Session {
    user: {
      role?: string;
      accessToken?: string;
      username?: string;
      id?: string | number;
    } & DefaultSession["user"];
  }
}

// گسترش اینترفیس JWT
declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    accessToken?: string;
    username?: string;
  }
}

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "نام کاربری",
          type: "text",
          placeholder: "نام کاربری"
        },
        password: {
          label: "کلمه عبور",
          type: "password",
          placeholder: "کلمه عبور", // درست شد placeholde -> placeholder
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const res = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return null;
        
        const loggedInUser = await res.json();

        const usersRes = await fetch("https://dummyjson.com/users");
        const usersData = await usersRes.json();
        const fullUser = usersData.users.find((u: any) => u.id === loggedInUser.id);

        if (!fullUser) return null;

        // برگرداندن آبجکت User استاندارد
        return {
          id: String(fullUser.id), // id باید string باشه
          name: fullUser.username,
          username: fullUser.username,
          token: loggedInUser.token,
          role: fullUser.role || "user",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken as string;
        session.user.role = token.role as string;
        session.user.username = token.username as string;
        session.user.id = token.sub as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
  },
  
  session: {
    strategy: "jwt", // استفاده از استراتژی JWT
  },
};