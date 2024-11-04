import React from "react";
import Link from "next/link";

const Questions = () => {
  return (
    <div className="flex flex-col bg-white h-screen pt-5 pb-5 items-center">
      <div className="text-black flex flex-row w-screen justify-between px-7">
        Welcome User
        <button className="text-black bg-slate-400 px-2 rounded-sm hover:text-white">
          Sign out
        </button>
      </div>
      <div className="text-black flex flex-col items-center h-screen justify-around">
        <div className="text-black mt-4">
          What category of questions do you want to answer?
        </div>
        <Link
        href="/generalknowledge"
        >
          {" "}
          <div className="w-screen text-center bg-orange-100 py-7 cursor-pointer">
            General Knowledge
          </div>
        </Link>
        <Link
        href="/film"
        >
          <div className="w-screen text-center bg-green-100 py-7 cursor-pointer">
            Entertainment: Film
          </div>
        </Link>
        <Link
        href="/science"
        >
          <div className="w-screen text-center bg-blue-100 py-7 cursor-pointer">
            Science and Nature
          </div>
        </Link>
        <Link
        href="/maths"
        >
          <div className="w-screen text-center bg-yellow-100 py-7 cursor-pointer">
            Science: Mathematics
          </div>
        </Link>
        <Link
        href="/animals"
        >
          <div className="w-screen text-center bg-purple-100 py-7 cursor-pointer">
            Animals
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Questions;
