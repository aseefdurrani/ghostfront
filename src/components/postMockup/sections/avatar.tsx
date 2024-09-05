import NextImage from "next/image";
import purpleProfileIcon from "@/assets/Images/purpleProfileIcon.png";
import { X, ChevronDown } from "lucide-react";

const AvatarSection = () => {
  return (
    <div className="relative flex h-[100px] w-full flex-row">
      <div className="ml-6 mt-6 flex h-[54px] w-[54px]">
        <div className="avatar">
          <div className="w-full rounded-full">
            <NextImage
              src={purpleProfileIcon}
              alt="Profile Picture"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
      <div className="ml-2 flex flex-col">
        <div className="mt-1 flex h-[50px] w-[180px] flex-row items-end gap-1">
          <div className="flex flex-row items-center">
            <h1 className="text-[18px] font-bold">Your Name</h1>
            <ChevronDown size={20} className="ml-1" />
          </div>
        </div>
        <p className="flex h-[50px] w-[180px] text-sm">Post to Anyone</p>
      </div>
      <div className="absolute right-0 top-0 mr-3 mt-3 flex h-[30px] w-[30px]">
        <X size={26} />
      </div>
    </div>
  );
};

export default AvatarSection;
