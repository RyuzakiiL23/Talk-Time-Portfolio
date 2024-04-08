'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OeGaf0eHvZ6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// import { Button } from "@/components/ui/button"
import Image from 'next/image'
import talk_time from '../public/talk_time.png'
import { useUser } from '@auth0/nextjs-auth0/client';
import useAuth0Mongo from '../hooks/useAuth0Mongo';
import LogOut from '../components/Home/LogOut';
// import useListenMessages from '../hooks/useListenMessages'
import Home from '../components/Home/Home'
import { useSelector } from "react-redux";

export default function Component() {
	const me = useSelector((state) => state.auth.value);
  // const auth = useSelector((state) => state.auth.value);
  // useListenMessages();
  const { user, error, isLoading } = useUser();
  useAuth0Mongo(user);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user && me?.email_verified === 'true') {
    console.log(user);
    return (
      <div>
        {/* Welcome {user.name}! <a href="/api/auth/logout"><button  onClick={LogOut}>Logout</button></a> */}
        <Home/>
        {/* <LogOut/> */}
      </div>
    );
  }
  if(user && me && me?.email_verified === 'false') {
    return(
      <div>verify ur email</div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="mb-8">
        <Image
          alt="Talk Time Logo"
          className="h-[100px] w-[100px] rounded-full"
          height="100"
          src={talk_time}
          style={{
            aspectRatio: "100/100",
            objectFit: "cover",
          }}
          width="100"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">Talk Time</h1>
      <p className="text-xl text-gray-600 mb-8">Connect with friends and the world around you.</p>
      <div className="space-y-4">
        <a href="/api/auth/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg" variant="default">
          Login
        </a>
        <a href="/api/auth/signup" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg" variant="default">
          Sign Up
        </a>
      </div>
    </div>
  )
}



// import UserState from "@/components/UserState/UserState";

// function Page() {
//   return (
//     <UserState/>
//   );
// }

// export default Page;

// import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement } from "../lib/Features/Counter/counterSlice";

// export default function Home() {
// //useSelector gets the state from store
//   const count = useSelector((state) => state.counter.value); // Access the counter state

// //useDispatch updates the store with the state from a component, as defined by your logic inside the counterslice.js
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h1>Counter: {count}</h1> {/* Display the counter state */}
//       <button onClick={() => dispatch(increment())}>Increment</button>
//       <button onClick={() => dispatch(decrement())}>Decrement</button>
//     </div>
//   );
// }
