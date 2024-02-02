import { useSession, signIn, signOut } from 'next-auth/react';

const SignIn = () => {
  const { data: session } = useSession();
  console.log("session ", session);
  return(
    <div>
      <h2>User Sign in page</h2>
      {!session ? (
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        ) : (
          <div>
            <p>Welcome, {session?.user?.name}!</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        )}
    </div>
  )
}

export default SignIn;