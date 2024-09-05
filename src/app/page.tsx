"use client";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import DashboardImg from "@/assets/Images/DashboardImg.jpg";


export default function Home() {
  const [email, setEmail] = useState('')

  const { ref: ref1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target
    setEmail(value)
  }

  const router = useRouter();

  const handleFileUpload = () => {
    router.push("/uploadVideo");
  };

  const handleAbout = () => {
    router.push("/about");
  };

  const handleWaitlist = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(emailPattern.test(email)) {
      router.push(`/waitlist?email=${encodeURIComponent(email)}`);
    } else if(email === '') {
      router.push(`/waitlist`);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="flex flex-col items-center px-4 md:px-0">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="flex min-h-[85vh] w-full max-w-[40vw] flex-col items-center justify-center text-center"
      >
        <h1 className="mb-8 text-center text-5xl sm:text-5xl font-bold font-medium text-white">
          Welcome to GhostLink
        </h1>
        <p className="mb-8 text-center text-base md:text-lg font-extralight text-white">
          An all-in-one platform that makes video transcription simple and helps
          you create impactful LinkedIn posts that drive high engagement.
        </p>
        <div className="flex w-full justify-center gap-4 md:gap-[1vw]">
          <button className="btn btn-primary" onClick={handleWaitlist}>
            Join Waitlist
          </button>
          <button className="ghost btn border-0 text-white" onClick={handleAbout}>Learn More</button>
        </div>
      </motion.div>
        <div className="w-full max-w-[85vw] md:max-w-[65vw] mt-4">
          <Image
            src={DashboardImg}
            alt="Dashboard Display"
            className="w-full rounded-tl-[6vw] rounded-tr-[6vw] md:rounded-tl-[4vw] md:rounded-tr-[4vw] border-[8px] md:border-[20px] border-b-0 border-[rgba(238,238,238,0.1)] p-2 md:p-4 pb-0 shadow-[0px_0px_5px_rgba(0,0,0,0.1)]"
          />
        </div>
      <motion.div
        ref={ref1}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView1 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[55vh] w-full items-center justify-center bg-[#f5f5f7] mt-6"
      >
        <div className="flex w-full max-w-[70vw] flex-col px-4">
          <h4 className="mb-3 w-full text-2xl md:text-5xl font-light">
            Optimize your LinkedIn post with our intuitive tools
          </h4>
          <p className="w-full text-sm md:text-lg font-extralight">
            Designed to enhance your content&apos;s reach and effectiveness.
            From automated video transcription to engaging content with audience
            retention, we provide everything you need to captivate your audience
            and boost your online presence.
          </p>
        </div>
      </motion.div>
      <motion.div
        ref={ref2}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView2 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[60vh] w-full flex-col items-center justify-center text-white mt-6"
      >
        <h4 className="mb-8 w-full max-w-[37vw] text-3xl md:text-5xl text-center font-light">
          Ditch the ghostwriters and elevate your engagement.
        </h4>
        <div className="flex bg-[#f5f5f7] gap-2 md:gap-[1vw] pt-1 pb-1 pl-4 pr-1 rounded-md w-full max-w-[400px]">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-transparent text-black focus:outline-none text-base md:text-lg w-full" 
            value={email} 
            onChange={handleChange}
          />
          <button className="btn btn-primary" onClick={handleWaitlist}>
            Join Waitlist
          </button>
        </div>
      </motion.div>
    </div>
  );
}
