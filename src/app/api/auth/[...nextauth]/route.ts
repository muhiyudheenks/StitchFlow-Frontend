import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const backendUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function authorizeGoogleToken(idToken: string) {
    const response = await fetch(`${backendUrl}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: idToken }),
        cache: "no-store",
    });

    if (!response.ok) return null;
    return (await response.json()) as {
        user?: {
            id: string;
            email: string;
            fullName: string;
            role: "employee" | "manager" | "admin";
            isVerified: boolean;
            isBlock: boolean;
        };
    };
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account }) {
            if (account?.provider !== "google" || !account.id_token) return false;
            return Boolean(await authorizeGoogleToken(account.id_token));
        },
        async jwt({ token, account }) {
            if (account?.provider === "google" && account.id_token) {
                const result = await authorizeGoogleToken(account.id_token);
                if (!result?.user) return token;

                token.userId = result.user.id;
                token.email = result.user.email;
                token.name = result.user.fullName;
                token.role = result.user.role;
                token.isVerified = result.user.isVerified;
                token.isBlock = result.user.isBlock;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                const sessionUser = session.user as typeof session.user & {
                    id?: string;
                    role?: "employee" | "manager" | "admin";
                    isVerified?: boolean;
                    isBlock?: boolean;
                };
                sessionUser.id = token.userId as string;
                sessionUser.role = token.role as "employee" | "manager" | "admin";
                sessionUser.isVerified = token.isVerified as boolean;
                sessionUser.isBlock = token.isBlock as boolean;
            }

            return session;
        },
    },
});

export { handler as GET, handler as POST };