"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { setProgress } from "@/redux/features/loadingBarSlice";
import { useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const page = () => {
  const { status } = useSession();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setProgress(70));
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (!res.error) {
        toast.success("Logged in successfully");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      dispatch(setProgress(100));
    }
  };

  // redirect if user is authenticated
  if (status === "loading") {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }
  if (status === "authenticated") {
    redirect("/");
  }
  return (
    <div className=" w-11/12 mx-auto mt-32 min-h-screen">
      <div className=" flex justify-center items-center">
        <div className="container flex justify-center flex-col items-center w-screen sm:w-[90vw] lg:w-1/2">
          <h1 className=" text-4xl text-cyan-400 font-medium mb-8">Login</h1>
          <form
            onSubmit={handelSubmit}
            className="text-white flex flex-col text-base lg:text-xl gap-2 font-medium"
          >
            <div className=" flex gap-4 items-end mb-3">
              <label className=" mr-9 lg:mr-11" htmlFor="email">
                Email
              </label>
              <input
                onChange={onchange}
                value={formData.email}
                name="email"
                type="email"
                placeholder="Email"
                required
                className=" appearance-none bg-black border-b border-white focus:outline-none text-base lg:text-lg"
              />
            </div>
            <div className=" flex gap-4 items-end">
              <label className="" htmlFor="password">
                Password
              </label>
              <input
                onChange={onchange}
                value={formData.password}
                name="password"
                type="password"
                placeholder="Password"
                required
                className=" appearance-none bg-black border-b border-white focus:outline-none text-base lg:text-lg"
              />
            </div>
            <Link href={"/reset-password"}>
              <p className=" text-xs text-[#00e6e6]">Forgot Password?</p>
            </Link>
            <div className=" w-full flex justify-center">
              <button
                type="submit"
                className="relative inline-block px-4 py-2 font-medium group"
              >
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-cyan-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-black border-2 border-white group-hover:bg-"></span>
                <span className="relative text-white group-hover:text-cyan-400">
                  Login
                </span>
              </button>
            </div>
            <div className=" flex justify-center items-center">
              <hr className=" w-1/2 mx-2 border-white" />
              <p className=" text-xs text-white">or</p>
              <hr className=" w-1/2 mx-2 border-white" />
            </div>
            <div className=" w-full flex justify-center">
              <button
                onClick={() => signIn("google")}
                type="button"
                className="flex items-center gap-[.7px] hover:border-[#00e6e6] justify-center px-4 py-2 group font-medium border-2 border-white rounded-sm"
              >
                <FaGoogle className=" group-hover:text-[#00e6e6]" />
                oogle
              </button>
            </div>
            <p className=" w-full flex justify-center gap-2">
              Don't have an account?{" "}
              <Link href={"/signup"} className=" text-cyan-400 font-semibold">
                {" "}
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
