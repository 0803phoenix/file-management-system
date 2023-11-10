import React, { useEffect, useState } from "react";
import Header from "./header";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import FileTextEditor from "./fileTextEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
function FileComponent() {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const navigate = useNavigate();

  const { currentFile, isAuthenticated } = useSelector(
    (state) => ({
      currentFile: state.fileFolders.userFiles.find(
        (file) => file.docId === fileId
      ),
      isAuthenticated:state.auth.isAuthenticated,
    }),
    shallowEqual
  );

  useEffect(()=>{
    console.log(isAuthenticated);
    if(!isAuthenticated){
      navigate("/");
    }
  },[])

  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile?.data?.data);
    }
    console.log(currentFile);
  }, [currentFile]);

  const downloadFile = ()=>{
    const element = document.createElement("a");
    element.setAttribute("href",  currentFile.data.url);
    element.setAttribute("download", currentFile.data.name);
    element.setAttribute("target", "_blank");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div>
      {isAuthenticated && currentFile?.data?.url === null ? (
        <>
          <Header
            fileName={currentFile?.data.name}
            fileId={fileId}
            fileData={fileData}
            prevFileData={currentFile?.data?.data}
          />
          <FileTextEditor
            fileName={currentFile?.data.name}
            data={fileData}
            setData={setFileData}
          />
        </>
      ) : (
        <>
          <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
            {/* Sub Menu Bar */}
            <div className="navbar navbar-expand-lg navbar-light bg-black shadow-sm mt-1">
              <p className="navbar-brand fw-bold ms-3 d-flex align-item-center mb-0 text-white">
                {currentFile?.data?.name.length > 40
                  ? currentFile?.data?.name.slice(0, 40) +
                    "... ." +
                    currentFile?.data?.extension
                  : currentFile?.data?.name}
              </p>
              <div className="navbar-nav ms-auto custom-flex">
                <div className="button-container d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => downloadFile()}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                    &nbsp; Download
                  </button>
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => navigate(-1)}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    &nbsp; Go back
                  </button>
                </div>
              </div>
            </div>
            {/* Main Content div */}
            <div className="w-100 mt-2 overflow-auto">
              {currentFile?.data?.extension.includes("png") ||
              currentFile?.data?.extension.includes("jpg") ||
              currentFile?.data?.extension.includes("jpeg") ||
              currentFile?.data?.extension.includes("gif") ? (
                // <marquee behavior="scroll" direction="left">
                <div className="max-height-viewport d-flex justify-content-center align-items-center">
                <img
                  src={currentFile?.data?.url}
                  alt={currentFile?.data?.name}
                  className="img-fluid"
                  style={{ maxHeight: "80vh" }} 
                />
                </div>
              ) : (
                // </marquee>
                <div className="w-100 h-100 d-flex justify-content-center mt-5">
                  <p>File type not supported... Please download the file!!</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FileComponent;
