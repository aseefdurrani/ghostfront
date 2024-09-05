"use client";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col items-center bg-customFooter pb-6 pt-6 md:flex-row md:justify-center">
      <div className="flex w-[90vw] flex-col gap-[1vw] text-black md:w-[70vw]">
        <div className="flex flex-row gap-2 items-center justify-center md:justify-start">
          <Image
            src="/ghostLogoPurple.png"
            alt="GhostLink Logo"
            width={40}
            height={40}
          />
          <h2 className="text-4xl font-bold text-center md:text-left">GhostLink</h2>
        </div>
        <div className="flex flex-col gap-1 text-base font-thin items-center md:items-start">
          <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-5">
            <p className="italic">Creators:</p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start text-sm md:text-base">
              <a
                href="https://www.linkedin.com/in/sajin-saju-917117200/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Sajin Saju
              </a>
              <a
                href="https://www.linkedin.com/in/nicholas-yim"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Nicholas Yim
              </a>
              <a
                href="https://www.linkedin.com/in/aseefdurrani"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Aseef Durrani
              </a>
              <a
                href="https://www.linkedin.com/in/justinklee1253/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Justin Lee
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-start">
            <p>Version 1.0.0</p>
          </div>
        </div>
        <div className="flex justify-center md:justify-start">
          <a
            href="https://www.flaticon.com/free-icons/user"
            title="user icons"
            className="text-sm text-gray-400 font-thin hover:underline"
          >
            User icons created by Flat Icons - Flaticon
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
