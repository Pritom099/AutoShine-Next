import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const user ={
    id: "1",
    name: "John Doe",
    email: "test@gmail.com",
    password: "1234"
}

export const authOptions = {
    // Configure one or more authentication providers
    providers: [

        CredentialsProvider({
            //  (e.g. 'Sign in with...')
            name: 'Credentials <3',

            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmit@example.com" },
                password: { label: "Password", type: "password", placeholder: "Your Password", }
            },
            async authorize(credentials, req) {


                // If no error and we have user data, return it
                if ( user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }