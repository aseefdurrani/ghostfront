"use client";
import { useState } from "react";
import axios from "axios";
import { Button, LinearProgress, Typography, Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

const FileUploadOLD: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [fileDetails, setFileDetails] = useState<{
    name: string;
    size: number;
    type: string;
    linkedin_post?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsProcessing(true); // Set processing state to true
    setUploadProgress(0); // Reset progress to 0
    setErrorMessage(null); // Reset any previous error messages

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            setUploadProgress(percentCompleted);
          },
        },
      );

      setFileDetails({
        name: response.data.file_name,
        size: response.data.file_size,
        type: response.data.file_type,
        linkedin_post: response.data.linkedin_post,
      });

      setSelectedFile(null); // Reset file selection
      setUploadProgress(0); // Reset progress for next upload
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to upload file. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <input
          accept="*/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            disabled={isProcessing}
          >
            Choose File
          </Button>
        </label>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFileUpload}
          disabled={!selectedFile || isProcessing}
          sx={{ ml: 2 }}
        >
          Upload
        </Button>
      </Box>
      {(uploadProgress > 0 || isProcessing) && (
        <Box mb={2} width="50%" mx="auto">
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: uploadProgress === 100 ? "#4caf50" : "#90caf9", // Change the bar color
              },
            }}
          />
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            {fileDetails && fileDetails.linkedin_post
              ? "Processing complete!"
              : "Processing video..."}
          </Typography>
        </Box>
      )}
      {errorMessage && (
        <Typography variant="body1" color="error" style={{ marginTop: "10px" }}>
          {errorMessage}
        </Typography>
      )}
      {fileDetails && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">File Details:</Typography>
          <Typography>
            <strong>Name:</strong> {fileDetails.name}
          </Typography>
          <Typography>
            <strong>Size:</strong> {(fileDetails.size / 1024).toFixed(2)} KB
          </Typography>
          <Typography>
            <strong>Type:</strong> {fileDetails.type}
          </Typography>
          {fileDetails.linkedin_post && (
            <div style={{ marginTop: "20px" }}>
              <Typography variant="h6">LinkedIn Post:</Typography>
              <Typography>
                <ReactMarkdown>{fileDetails.linkedin_post}</ReactMarkdown>
              </Typography>{" "}
              {/* Display the LinkedIn post */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadOLD;
