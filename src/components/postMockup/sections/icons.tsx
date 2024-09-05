import { Image, CalendarDays, BadgeInfo, Plus } from "lucide-react";
import React, { RefObject } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional: Include default styles

interface IconsSectionProps {
  onImageUpload: (imageUrl: string) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

const IconsSection: React.FC<IconsSectionProps> = ({ onImageUpload, fileInputRef }) => {
  // Handle image icon click
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          onImageUpload(reader.result as string); // Call the function passed from PostMockUp
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="ml-5 flex h-[50px] w-full items-center gap-7">
      <Tippy content="Add media" placement="top" className="tooltip-custom">
        <button
          onClick={handleImageClick}
          className="hover:bg-gray-200 rounded-full p-1"
          aria-label="Upload Image"
        >
          <Image size={22} />
        </button>
      </Tippy>

      <Tippy content="Create an Event" placement="top" className="tooltip-custom">
        <button
          onClick={() => console.log("Calendar icon clicked")}
          className="hover:bg-gray-200 rounded-full p-1"
          aria-label="Open Calendar"
        >
          <CalendarDays size={22} />
        </button>
      </Tippy>

      <Tippy content="[Delete this?]" placement="top" className="tooltip-custom">
        <button
          onClick={() => console.log("Badge icon clicked")}
          className="hover:bg-gray-200 rounded-full p-1"
          aria-label="Show Badge Info"
        >
          <BadgeInfo size={22} />
        </button>
      </Tippy>

      <Tippy content="More" placement="top" className="tooltip-custom">
        <button
          onClick={() => console.log("Plus icon clicked")}
          className="hover:bg-gray-200 rounded-full p-1"
          aria-label="Add New Item"
        >
          <Plus size={22} />
        </button>
      </Tippy>

      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default IconsSection;
