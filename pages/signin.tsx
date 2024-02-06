import { getSession, signIn } from 'next-auth/react';

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if(session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const SignIn = () => {
  return(
    <div>
      <h1>Sign in page</h1>
      <button onClick={() => signIn('google', { callbackUrl: '/profile' })}>Sign in with Google</button>
    </div>
  )
}

export default SignIn;