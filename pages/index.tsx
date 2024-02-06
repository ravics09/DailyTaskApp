import { getSession, useSession, signOut } from 'next-auth/react';
import Link from "next/link";

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  return {
    props: {
      session: session
    }
  }
}

const Home = () => {
  const session = useSession()
  const isLoggedIn = session && session?.data?.user;
  return (
    <div>
      <h1>Home Page</h1>
      {
        isLoggedIn ? (
          <>
          <h2>Welcome {session.data?.user?.name}</h2>
          <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <Link href="signin">Goto Signin Page</Link>
        )
      }
    </div>
  );
};

export default Home;
