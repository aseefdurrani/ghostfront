"use client";
import { useState } from "react";
import EditPostMockup from "@/utils/editPostMockup";
import PostMockUp from "../postMockup/postMockUp";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [linkedinPost4o, setLinkedinPost4o] = useState<string | null>(null);
  const dummyText = `🚀 **Why Effortless Content Can Drive Massive Revenue** 💰

  Ever wonder who truly profits from TikTok? It’s often the creators who seem to put in the least effort! 
  
  Take, for instance, a TikTok creator who claims to make over $300K a month by simply promoting a copywriting course. His videos? Unedited, raw, and shot on his iPhone. 
  
  So, what’s the secret sauce? Here are some key takeaways:
  
  1. **Energy Over Perfection**: It’s not just about what you say; it’s about how you say it. The energy you bring to your content can make all the difference. 
  
  2. **Authenticity Wins**: Viewers can sense tension and anxiety. When you’nre comfortable and in a flow state, your message resonates more deeply.
  
  3. **Mindset Matters**: Before hitting record, take a moment to breathe and clear your mind. Let your true self shine through—this authenticity attracts followers and customers alike.
  
  4. **Practice Makes Perfect**: Don’t be afraid to pick up the camera and share your thoughts. The more you do it, the more natural it becomes.
  
  In my own journey, I’ve found that embracing vulnerability and authenticity has transformed my content creation process. The more I let go of self-doubt, the more my audience connects with me.
  
  💡 **What strategies do you use to connect with your audience? Share your thoughts below!**
  
  #ContentCreation #MarketingStrategy #Authenticity #PersonalGrowth #TikTokMarketing #ProfessionalDevelopment`;
  
  const [linkedinPost4oMini, setLinkedinPost4oMini] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleImageUpload = (imageUrl: string) => {
    // Logic for handling image uploads
    console.log("Image uploaded:", imageUrl);
  };

  const componentsStyle = {
    p: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
      <p className="mb-4" {...props} />
    ),
    ul: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
      <ul className="mb-4 list-inside list-disc" {...props} />
    ),
    ol: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
      <ol className="mb-4 list-inside list-decimal" {...props} />
    ),
    li: ({ node, children, ...props }: { node?: unknown; [key: string]: any }) => {
      const [firstChild, ...rest] = children as React.ReactNode[];
      return (
        <li className="mb-2" {...props}>
          <span className="inline">{firstChild} </span>
          {rest.length > 0 && <span className="inline">{rest}</span>}
        </li>
      );
    },
    h1: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
      <h1 className="mb-4 text-2xl font-bold" {...props} />
    ),
    h2: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
      <h2 className="mb-3 text-xl font-bold" {...props} />
    ),
    h3: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
      <h3 className="mb-2 text-lg font-bold" {...props} />
    ),
    strong: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
      <strong className="font-bold" {...props} />
    ),
    em: ({ node, ...props }: { node?: unknown; [key: string]: any }) => (
      <em className="italic" {...props} />
    ),
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setStatus("");
    }
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      alert("No file selected");
      return;
    }

    setStatus("Uploading video...");

    try {
      const formData = new FormData();
      formData.append("videoFile", selectedFile);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        setTimeout(() => {
          setStatus("Transcribing...");
        }, 2000);

        const data = await response.json();
        setTimeout(() => {
          setStatus("Generating post...");
        }, 4000);

        setTimeout(() => {
          setLinkedinPost4o(data.linkedin_post_4o);
          setLinkedinPost4oMini(data.linkedin_post_4o_mini);
          setStatus("Completed!");
        }, 6000);
      } else {
        alert("An error occurred during file upload");
        setStatus("");
      }
    } catch (e) {
      console.log("ERROR: ", e);
      setStatus("");
    }
  };

  return (
    <div className="flex w-full flex-col items-center p-4 md:p-0"> {/* Add padding for better mobile spacing */}
      <h2 className="text-center text-xl font-bold text-white mb-4">
        Please select a video to upload:
      </h2>
      <div className="mt-6 flex w-full max-w-md flex-col items-center md:flex-row md:justify-center">
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs mb-4 md:mb-0 md:mr-3"
          accept="video/*" // Restrict file input to video files
          onChange={handleFileChange}
          disabled={status !== "" && status !== "Completed!"}
        />
        <button
          className="btn btn-primary w-full md:w-auto"
          onClick={handleFileSubmit}
          disabled={status !== "" && status !== "Completed!"}
        >
          {status || "Upload"}
        </button>
      </div>

      {status !== "" && status !== "Completed!" && (
        <div className="mt-6 h-6 w-full max-w-md rounded-full bg-gray-200">
          <div className="animate-loading h-full rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100">
            {status}
          </div>
        </div>
      )}

      {linkedinPost4o && linkedinPost4oMini && (
        <div className="mt-10 w-full border-t border-gray-500">
          <h2 className="mt-9 text-center text-xl font-bold text-white">
            Personally Written LinkedIn Posts:
          </h2>
          <PostMockUp
            linkedInPost4o={
              <EditPostMockup
                postContent={linkedinPost4o}
                onSave={(content) => setLinkedinPost4o(content)}
                onCancel={() => {}}
                componentsStyle={componentsStyle}
                onImageUpload={handleImageUpload}
              />
            }
            linkedInPost4oMini={
              <EditPostMockup
                postContent={linkedinPost4oMini}
                onSave={(content) => setLinkedinPost4oMini(content)}
                onCancel={() => {}}
                componentsStyle={componentsStyle}
                onImageUpload={handleImageUpload}
              />
            }
          />
          <div className="h-[200px] w-full"></div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
