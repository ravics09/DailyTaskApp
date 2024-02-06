import NextAuth from "next-auth";
import { User, Account } from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: any;
      user: User;
      account: Account | null;
    }) {
      if (user?.id) token = Object.assign({}, token, { _id: user.id });
      // Check the contents of the account object
      console.log("Account Object:", account);
      console.log("User Object:", user);
      // Include the accessToken in the token
      // Fetch the full token from Google's API
      if (account?.provider === "google" && account?.refreshToken) {
        try {
          const response = await axios.post(
            "https://www.googleapis.com/oauth2/v4/token",
            {
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              refresh_token: account.refreshToken,
              grant_type: "refresh_token",
            }
          );

          if (response.data.access_token) {
            token.accessToken = response.data.access_token;
            // Print the full access JWT token
            console.log("Full Access JWT Token:", token.accessToken);
          }
        } catch (error) {
          console.error("Error fetching full Google token:", error);
        }
      }

      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      if (token?._id) session.user._id = token._id;
      if (token?.sub) session.user._id = token.sub;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      session.token = token;
      return session;
    },
  },
  events: {},
  debug: false,
});
