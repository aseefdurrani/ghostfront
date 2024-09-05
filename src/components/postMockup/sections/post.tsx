"use client";
import { useState } from "react";
import { Clock5 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Optional: Include default styles

interface PostButtonSectionProps {
  onSchedulePost: (date: Date | null) => void;
}

const PostButtonSection = ({ onSchedulePost }: PostButtonSectionProps) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Function to handle the schedule post click
  const handleScheduleClick = () => {
    setShowScheduleModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowScheduleModal(false);
  };

  const handleSchedulePost = () => {
    if (!selectedDate) {
      alert("Please select a date and time.");
      return;
    }
    // Call the function passed from PostMockUp to handle scheduling logic
    onSchedulePost(selectedDate);
    setShowScheduleModal(false);
  };

  return (
    <div className="border-black-100 flex h-[50px] w-full border-t">
      <div className="ml-auto flex flex-row items-center gap-3">
        <Tippy content="Schedule Post" placement="top" className="tooltip-custom">
          <button
            onClick={handleScheduleClick}
            className="flex items-center justify-center h-[32px] w-[32px] rounded-full hover:bg-gray-200"
            aria-label="Schedule Post"
          >
            <Clock5 size={22} />
          </button>
        </Tippy>
        <button className="text-md btn btn-primary btn-sm mr-3 h-[32px] w-[70px] rounded-full text-white">
          Post
        </button>
      </div>

      {/* Modal for scheduling a post */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 shadow-lg w-[300px] z-50">
            <h2 className="text-lg font-bold mb-4">Schedule Post In Advance</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="Pp" // Displays date and time
              className="mt-2 p-2 border rounded w-full"
              placeholderText="Select date and time"
            />
            <div className="flex gap-4 mt-4">
              <button
                className="text-md btn btn-primary btn-sm h-[32px] w-[70px] rounded-full text-white"
                onClick={handleSchedulePost}
              >
                Confirm
              </button>
              <button
                className="text-md btn btn-secondary btn-sm h-[32px] w-[70px] rounded-full hover:bg-gray-400 hover:border-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostButtonSection;
