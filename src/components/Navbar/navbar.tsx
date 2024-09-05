"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  useUser,
  SignInButton,
  useClerk,
  useAuth,
  SignUpButton,
} from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname()

  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth(); // Hook to get the user's auth token

  const handleHome = () => {
    router.push("/");
  };
  
  const handleAbout = () => {
    router.push("/about");
  };

  const handleLogOut = () => {
    signOut();
    router.push("/");
  };

  // Function to make an authenticated request
  // call makeAuthenticatedRequest wherever you need to make backend requests that require authentication
  const makeAuthenticatedRequest = async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    try {
      // Retrieve the token
      const token = await getToken();

      // Inject the token into the headers
      const response = await fetch(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });

      // Handle response
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      return await response.json();
    } catch (error) {
      console.error("Error making authenticated request:", error);
    }
  };

  return (
    <div className="navbar fixed left-1/2 top-8 flex w-[90vw] max-w-[60vw] -translate-x-1/2 transform items-center justify-between rounded-full bg-customNavbar p-3 backdrop-blur-md md:justify-center md:w-[60vw]">
      <div className="navbar-start">
        <a
          className="btn btn-ghost text-xl font-medium text-white flex items-center"
          onClick={handleHome}
        >
          <Image
            src="/ghostLogoPurple.png"
            alt="GhostLink Logo"
            width={35}
            height={35}
            className="mr-2"
          />
          <span className="hidden md:inline">GhostLink</span>
        </a>
      </div>
      <div className="navbar-middle">
          <button className={`btn border-none text-white font-medium text-xl ${pathname === "/about" ? "bg-[rgba(255,255,255,0.1)] border-none rounded-full" : "btn-ghost"}`} onClick={handleAbout}>About</button>
      </div>

      <div className="navbar-end flex space-x-2">
        <button className="btn btn-circle btn-ghost text-black md:hidden">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge indicator-item badge-primary badge-xs"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            className="btn btn-circle btn-ghost text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            {
              <li>
              <a >Coming soon!</a>
              </li>            
            /* {isSignedIn ? (
              <>
                <li>
                  <a href="/uploadVideo">Make a LinkedIn Post</a>
                </li>
                <li>
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard">
                    <button>Sign Up</button>
                  </SignUpButton>
                </li>
                <li>
                  <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                    <button>Log In</button>
                  </SignInButton>
                </li>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
