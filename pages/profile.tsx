import { getSession, signOut } from 'next-auth/react';


const fetchProfile = async () => {
  // call api to fetch user data after signin
  return {}
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  console.log("session data", session);
  if(!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    }
  }

  const profileData = await fetchProfile();
  return {
    props: profileData
  }
}

const Profile = () => {
  return(
    <div>
      <h2>Welcome to Profile page</h2>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Profile;