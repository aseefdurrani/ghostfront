"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { X } from "lucide-react";

interface EditPostProps {
  postContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
  componentsStyle: any;
  onImageUpload: (imageUrl: string) => void; // Pass the image upload function from the parent
}

const EditPostMockup = ({
  postContent,
  onSave,
  onCancel,
  componentsStyle,
  onImageUpload,
}: EditPostProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>(postContent);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(postContent);
    setUploadedImages([]); // Clear uploaded images on cancel
    onCancel();
    setIsEditing(false);
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-3 ml-10 mr-10 mt-4 h-[530px] overflow-y-auto relative">
      {isEditing ? (
        <>
          <textarea
            className="h-full w-full rounded-md p-2 text-black"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Uploaded ${index}`} className="max-h-40 rounded border" />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-gray-700 text-white rounded-full p-1 hover:bg-red-500"
                  aria-label="Remove Image"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <button
              className="text-md btn btn-primary btn-sm h-[22px] w-[70px] rounded-full text-white"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-md btn btn-secondary btn-sm h-[22px] w-[70px] rounded-full hover:bg-gray-400 hover:border-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <ReactMarkdown
            remarkPlugins={[remarkBreaks, remarkGfm]}
            components={componentsStyle}
          >
            {editedContent}
          </ReactMarkdown>
          {uploadedImages.map((image, index) => (
            <img key={index} src={image} alt={`Uploaded ${index}`} className="max-h-40 rounded border" />
          ))}
          <button
            className="text-md btn btn-primary btn-sm h-[22px] w-[70px] rounded-full text-white"
            onClick={handleEdit}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default EditPostMockup;
