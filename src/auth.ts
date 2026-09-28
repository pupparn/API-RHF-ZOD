import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// No adapter → JWT session in an encrypted cookie, nothing stored server-side.
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [Google],
    callbacks: {
        // Called by proxy.ts. Guests may browse; /products/* (add/edit pages) needs sign-in.
        authorized({ auth, request }) {
            return !request.nextUrl.pathname.startsWith("/products") || !!auth;
        },
    },
});
