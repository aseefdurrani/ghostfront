import FileUpload from "../../components/FileUpload/FileUpload";

const FileUploadPage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex min-h-screen w-[40vw] flex-col items-center justify-center">
        <div>
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;
