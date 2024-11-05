"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

const Questions = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  
  function signUserOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signout successful");
        router.push("/"); // Redirect to home page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  return (
    <div className="flex flex-col font-semibold bg-white h-screen pt-5 pb-5 items-center">
      <div className="text-black flex flex-row w-screen justify-between px-7">
        <p>Hello there!</p>
        <button
          onClick={signUserOut}
          className="bg-slate-500 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Sign out
        </button>
      </div>
      <div className="text-black flex flex-col items-center h-screen justify-around">
        <div className="text-black mt-4">
          What category of questions do you want to answer?
        </div>
        <Link href="/generalknowledge">
          <div className="w-[90vw] rounded-md text-center bg-orange-100 py-7 cursor-pointer">
            General Knowledge
          </div>
        </Link>
        <Link href="/film">
          <div className="w-[90vw] rounded-md text-center bg-green-100 py-7 cursor-pointer">
            Entertainment: Film
          </div>
        </Link>
        <Link href="/science">
          <div className="w-[90vw] rounded-md text-center bg-blue-100 py-7 cursor-pointer">
            Science and Nature
          </div>
        </Link>
        <Link href="/maths">
          <div className="w-[90vw] rounded-md text-center bg-yellow-100 py-7 cursor-pointer">
            Science: Mathematics
          </div>
        </Link>
        <Link href="/animals">
          <div className="w-[90vw] rounded-md text-center bg-purple-100 py-7 cursor-pointer">
            Animals
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Questions;
