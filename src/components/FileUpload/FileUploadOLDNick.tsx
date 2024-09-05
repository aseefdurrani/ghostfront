"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [linkedinPost4o, setLinkedinPost4o] = useState<string | null>(null);
  const [linkedinPost4oMini, setLinkedinPost4oMini] = useState<string | null>(
    null,
  );
  const [status, setStatus] = useState<string>("");
  const [isEditing4o, setIsEditing4o] = useState<boolean>(false);
  const [isEditing4oMini, setIsEditing4oMini] = useState<boolean>(false);
  const [editedPost4o, setEditedPost4o] = useState<string | null>(null);
  const [editedPost4oMini, setEditedPost4oMini] = useState<string | null>(null);

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
    li: ({
      node,
      children,
      ...props
    }: {
      node?: unknown;
      [key: string]: any;
    }) => {
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
        }, 2000); // Simulate time for transcription

        const data = await response.json();
        setTimeout(() => {
          setStatus("Generating post...");
        }, 4000); // Simulate time for generating post

        setTimeout(() => {
          setLinkedinPost4o(data.linkedin_post_4o);
          setLinkedinPost4oMini(data.linkedin_post_4o_mini);
          setEditedPost4o(data.linkedin_post_4o);
          setEditedPost4oMini(data.linkedin_post_4o_mini);
          setStatus("Completed!");
        }, 6000); // Complete the process
      } else {
        alert("An error occurred during file upload");
        setStatus("");
      }
    } catch (e) {
      console.log("ERROR: ", e);
      setStatus("");
    }
  };

  const handleEdit = (postType: "4o" | "4o-mini") => {
    if (postType === "4o") setIsEditing4o(true);
    if (postType === "4o-mini") setIsEditing4oMini(true);
  };

  const handleSave = (postType: "4o" | "4o-mini") => {
    if (postType === "4o") {
      setLinkedinPost4o(editedPost4o);
      setIsEditing4o(false);
    }
    if (postType === "4o-mini") {
      setLinkedinPost4oMini(editedPost4oMini);
      setIsEditing4oMini(false);
    }
  };

  const handleCancel = (postType: "4o" | "4o-mini") => {
    if (postType === "4o") {
      setEditedPost4o(linkedinPost4o);
      setIsEditing4o(false);
    }
    if (postType === "4o-mini") {
      setEditedPost4oMini(linkedinPost4oMini);
      setIsEditing4oMini(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-center text-3xl text-white">
        Please select a file to upload!
      </h1>
      <div className="mt-9 flex w-full max-w-md flex-row items-center justify-center">
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileChange}
          disabled={status !== "" && status !== "Completed!"} // Disable during upload
        />
        <button
          className="btn btn-primary ml-3"
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

      {linkedinPost4o && (
        <div className="mt-6 w-full">
          <h2 className="text-center text-xl font-bold text-white">
            Generated LinkedIn Post:
          </h2>
          <div className="flex flex-row gap-9 p-5">
            <div className="h-[600px] w-[680px] rounded-[20px] border bg-[#4361ee] bg-opacity-30 text-white">
              <h1 className="ml-5 mt-5 font-bold text-white">
                Post Generated by 4o:
              </h1>
              <div className="mb-3 ml-10 mr-10 mt-4 h-[530px] overflow-y-auto">
                {isEditing4o ? (
                  <>
                    <textarea
                      className="h-full w-full rounded-md p-2 text-black"
                      value={editedPost4o || ""}
                      onChange={(e) => setEditedPost4o(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSave("4o")}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleCancel("4o")}
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
                      {linkedinPost4o}
                    </ReactMarkdown>
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleEdit("4o")}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>

            {linkedinPost4oMini && (
              <div className="h-[600px] w-[650px] rounded-[20px] border bg-[#4361ee] bg-opacity-30 text-white">
                <h1 className="ml-5 mt-5 font-bold text-white">
                  Post Generated by 4o-mini:
                </h1>
                <div className="mb-3 ml-10 mr-10 mt-4 h-[530px] overflow-y-auto">
                  {isEditing4oMini ? (
                    <>
                      <textarea
                        className="h-full w-full rounded-md p-2 text-black"
                        value={editedPost4oMini || ""}
                        onChange={(e) => setEditedPost4oMini(e.target.value)}
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleSave("4o-mini")}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleCancel("4o-mini")}
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
                        {linkedinPost4oMini}
                      </ReactMarkdown>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleEdit("4o-mini")}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
