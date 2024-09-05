"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Waitlist = () => {
  const router = useRouter();

  const [waitlistData, setWaitlistData] = useState({ fullName: "", email: "" });
  const [submittedData, setSubmittedData] = useState({
    fullName: "",
    email: "",
  }); // New state for submitted data
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    if (emailParam) {
      setWaitlistData((prevData) => ({
        ...prevData,
        email: emailParam,
      }));
    }
  }, []);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setWaitlistData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmitted = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(waitlistData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!waitlistData.fullName || !waitlistData.email) {
      alert("Please fill out both fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullName", waitlistData.fullName);
      formData.append("email", waitlistData.email);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/waitlist`,
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const result = await response.json();
        // Set submitted data for modal display
        setSubmittedData(waitlistData);

        // Clear the form entries after successful submission
        setWaitlistData({ fullName: "", email: "" });

        // show modal only if the response we get back is successful
        const modal = document.getElementById("my_modal_3");
        if (modal) {
          (modal as HTMLDialogElement).showModal();
        }
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("ERROR: ", error);
      if (error instanceof Error) {
        // console.log("error message: ", error.message);

        if (error.message.includes("status: 409")) {
          setErrorMessage("You are already on the waitlist.");
        } else {
          setErrorMessage(
            "There was an error submitting the form. Please try again later.",
          );
        }
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later.",
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 md:px-0">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-lg p-6 md:max-w-lg md:p-10 lg:p-14">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center text-white"
        >
          <h2 className="text-4xl font-medium text-gray-500 md:text-7xl">
            Join the waitlist for
          </h2>
          <h2 className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-medium text-transparent md:text-7xl">
            GhostLink!
          </h2>
        </motion.div>
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-4">
            <label className="input input-bordered flex items-center gap-2 overflow-x-auto border-2 border-[#484444] bg-black focus-within:border-[#484444] hover:bg-[rgba(255,255,255,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="white"
                className="h-4 w-4 flex-shrink-0"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow text-white"
                placeholder="Full Name"
                name="fullName"
                value={waitlistData.fullName}
                onChange={handleChange}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 overflow-x-auto border-2 border-[#484444] bg-black focus-within:border-[#484444] hover:bg-[rgba(255,255,255,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="white"
                className="h-4 w-4 flex-shrink-0"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow text-white"
                placeholder="Email Address"
                name="email"
                value={waitlistData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <button
              className="btn btn-primary w-full text-lg"
              onClick={handleFormSubmitted}
            >
              Join the waitlist
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="text-center text-2xl font-bold">
                  We have added you to the waitlist!
                </h3>
                <p className="text-md py-4 text-center font-light">
                  Stay tuned for our launch date{" "}
                  <strong>{submittedData.fullName}</strong>, we will be emailing
                  you at <strong>{submittedData.email}</strong> with any
                  updates!
                </p>
              </div>
            </dialog>
          </div>
        </div>
        {errorMessage && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Waitlist;
