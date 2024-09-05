"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const DashboardPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  // Greet the user by their first name
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold text-white">
        Hello, {user?.firstName}!
      </h1>
      <p className="mt-4 text-lg text-white">
        Welcome to your dashboard.
      </p>
    </div>
  );
};

export default DashboardPage;
